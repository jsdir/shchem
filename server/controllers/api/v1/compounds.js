const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');
var rdkit = require('../../../util/rdkit');

var compoundToJson = (compound) => ({
  cid: compound.cid,
  img: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + compound.cid + "/PNG",
  name: compound.iupac_name_preferred,
  props: compound.data.props.map((prop) => ({
    label: prop.urn.label,
    name: prop.urn.name,
    value: prop.value.sval,
    // img: prop.urn.label == 'SMILES' && rdkit.fromSmiles(prop.value.sval),
  }))
});

module.exports.show = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => res.json(compoundToJson(compound)));
};

module.exports.query = function(req, res) {
  conditions = SEARCHABLE.map((searchable) => ({
    [searchable]: { $like: `%${req.query.query}%` }
  }));
  CompoundView.findAll({
    where: { $or: conditions },
    limit: 10,
  }).then((compounds) => {
    res.json(compounds.map((compound) => compoundToJson(compound)));
  });
};
