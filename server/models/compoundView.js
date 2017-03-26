const Sequelize = require('sequelize');
const sq = require('../sq');

// order by preference of match
const SEARCHABLE = {
  iupac_name_preferred: { label: 'IUPAC Name', name: 'Preferred' },
  iupac_name_allowed: { label: 'IUPAC Name', name: 'Allowed' },
  iupac_name_cas: { label: 'IUPAC Name', name: 'CAS-like Style' },
  iupac_name_systematic: { label: 'IUPAC Name', name: 'Systematic' },
  iupac_name_traditional: { label: 'IUPAC Name', name: 'Traditional' },
  inchi_standard: { label: 'InChI', name: 'Standard' },
  inchi_key_standard: { label: 'InChIKey', name: 'Standard' },
  smiles_isomeric: { label: 'SMILES', name: 'Isomeric' },
  smiles_canonical: { label: 'SMILES', name: 'Canonical' },
};

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

module.exports = { CompoundView, SEARCHABLE };
