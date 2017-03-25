const Sequelize = require('sequelize');
const sq = require('../sq');
const _ = require('lodash');

// order by preference of match
const PROPS = {
  iupac_name_preferred: { label: 'IUPAC Name', name: 'Preferred', type: 'sval' },
  iupac_name_allowed: { label: 'IUPAC Name', name: 'Allowed', type: 'sval' },
  iupac_name_cas: { label: 'IUPAC Name', name: 'CAS-like Style', type: 'sval' },
  iupac_name_systematic: { label: 'IUPAC Name', name: 'Systematic', type: 'sval' },
  iupac_name_traditional: { label: 'IUPAC Name', name: 'Traditional', type: 'sval' },
  inchi_standard: { label: 'InChI', name: 'Standard', type: 'sval' },
  inchi_key_standard: { label: 'InChIKey', name: 'Standard', type: 'sval' },
  smiles_isomeric: { label: 'SMILES', name: 'Isomeric', type: 'sval' },
  smiles_canonical: { label: 'SMILES', name: 'Canonical', type: 'sval' },
  molecular_weight: { label: 'Molecular Weight', type: 'fval' },
};

const SEARCHABLE = _.pick(PROPS, [
  'iupac_name_preferred',
  'iupac_name_allowed',
  'iupac_name_cas',
  'iupac_name_systematic',
  'iupac_name_traditional',
  'inchi_standard',
  'inchi_key_standard',
  'smiles_isomeric',
  'smiles_canonical',
]);

const columns = {
  cid: Sequelize.INTEGER,
  data: Sequelize.JSON,
};

Object.keys(SEARCHABLE).forEach((column) => {
  columns[column] = Sequelize.TEXT;
});

const CompoundView = sq.define('compound_view', columns, {
  createdAt: false,
  timestamps: false,
  tableName: 'compounds_view'
});

module.exports = { CompoundView, PROPS, SEARCHABLE };
