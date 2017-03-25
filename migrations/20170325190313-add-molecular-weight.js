'use strict';
const _ = require('lodash');
const { PROPS } = require('../server/models/compoundView');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const columns = Object.entries(PROPS).map(([key, data]) => {
      const cond = _.chain(['name', 'label'])
        .map(dataKey => data.hasOwnProperty(dataKey)
          && `props.prop->'urn'->>'${dataKey}' = '${data[dataKey]}'`)
        .compact()
        .value()
        .join(' AND ')

      return `
        (
          SELECT
          (props.prop->'value'->>'${data.type}')${data.type === 'fval' ? '::float' : ''}
          FROM (
            SELECT json_array_elements(compounds.data->'props') prop
          ) props WHERE ${cond}
        ) AS ${key}
      `
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

    const indices = Object.keys(PROPS).map((key) => (
      () => queryInterface.addIndex('compounds_view', [key], {
        indexName: `${key}_index`
      })
    ));

    return queryInterface.sequelize.query('DROP MATERIALIZED VIEW compounds_view').then(() => (
      queryInterface.sequelize.query(migration)
    )).then(() =>
      Promise.all(indices)
    );
  }
};
