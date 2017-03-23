const Compound = require('../models/compound');
var RDKit=require('rdkit');

module.exports.index = function(req, res){
  Compound.findAll({
    offset: req.query.offset, limit: req.query.limit
  }).then(compounds => {
    compounds.forEach((compound) => {
      compound.data.props.forEach((prop) => {
        if (prop.urn.label == 'SMILES') {
          var mol = RDKit.Molecule.fromSmiles(prop.value.sval);
          var molwt = mol.getMW();
          var mol2d = mol.Drawing2D();
          var remol = mol2d.replace(/svg:/g, '');
          prop.img = remol.replace("<?xml version='1.0' encoding='iso-8859-1'?>", '');
        }
      });
    });
    res.render('compounds', { compounds });
  })
}
