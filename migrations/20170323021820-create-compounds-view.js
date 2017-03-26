'use strict';
const { SEARCHABLE } = require('../server/models/compoundView');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const columns = Object.keys(SEARCHABLE).map((key) => {
      const data = SEARCHABLE[key];
      return `
      (
        SELECT
        props.prop->'value'->>'sval'
        FROM (
          SELECT json_array_elements(compounds.data->'props') prop
        ) props
        WHERE props.prop->'urn'->>'label' = '${data.label}'
        AND props.prop->'urn'->>'name' = '${data.name}'
      ) AS ${key}`;
    });

    const migration = `
      CREATE MATERIALIZED VIEW compounds_view AS
      SELECT
      id,
      cid,
      ${columns.join(',')},
      data
      FROM compounds
    `;

    const indices = Object.keys(SEARCHABLE).map((key) => (
      () => queryInterface.addIndex('compounds_view', [key], {
        indexName: `${key}_index`
      })
    ));

    return queryInterface.sequelize.query(migration).then(() =>
      Promise.all(indices)
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('DROP MATERIALIZED VIEW compounds_view');
  }
};
