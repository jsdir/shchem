const Sequelize = require('sequelize');
const sq = require('../sq');

const SEARCHABLE = [
  'iupac_name_allowed',
  'iupac_name_cas',
  'iupac_name_preferred',
  'iupac_name_systematic',
  'iupac_name_traditional',
  'inchi_standard',
  'inchi_key_standard',
  'smiles_isomeric',
  'smiles_canonical',
]

const columns = {
  cid: Sequelize.INTEGER,
  data: Sequelize.JSON,
};
SEARCHABLE.forEach((column) => {
  columns[column] = Sequelize.TEXT;
});

const CompoundView = sq.define('compound_view', columns, {
  createdAt: false,
  timestamps: false,
  tableName: 'compounds_view'
});

module.exports = { CompoundView, SEARCHABLE };
