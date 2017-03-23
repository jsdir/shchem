'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const extract = {
      iupac_name_allowed: { label: 'IUPAC Name', name: 'Allowed' },
      iupac_name_cas: { label: 'IUPAC Name', name: 'CAS-like Style' },
      iupac_name_preferred: { label: 'IUPAC Name', name: 'Preferred' },
      iupac_name_systematic: { label: 'IUPAC Name', name: 'Systematic' },
      iupac_name_traditional: { label: 'IUPAC Name', name: 'Traditional' },
      inchi_standard: { label: 'InChI', name: 'Standard' },
      inchi_key_standard: { label: 'InChIKey', name: 'Standard' },
      smiles_isomeric: { label: 'SMILES', name: 'Isomeric' },
      smiles_canonical: { label: 'SMILES', name: 'Canonical' },
    };

    const columns = Object.entries(extract).map(([key, data]) => `
      (
        SELECT
        props.prop->'value'->>'sval'
        FROM (
          SELECT json_array_elements(compounds.data->'props') prop
        ) props
        WHERE props.prop->'urn'->>'label' = '${data.label}'
        AND props.prop->'urn'->>'name' = '${data.name}'
      ) AS ${key}
    `);

    const migration = `
      CREATE MATERIALIZED VIEW compounds_view AS
      SELECT
      id,
      cid,
      ${columns.join(',')},
      data
      FROM compounds
    `;

    const indices = Object.keys(extract).map((key) => (
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
