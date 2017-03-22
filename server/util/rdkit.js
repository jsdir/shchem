var RDKit = require('rdkit');

module.exports.fromSmiles = function(smiles) {
  var mol = RDKit.Molecule.fromSmiles(smiles);
  var molwt = mol.getMW();
  var mol2d = mol.Drawing2D();
  var remol = mol2d.replace(/svg:/g, '');
  return remol.replace("<?xml version='1.0' encoding='iso-8859-1'?>", '');
};
