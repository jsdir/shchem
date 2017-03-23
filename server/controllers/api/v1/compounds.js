const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');
var rdkit = require('../../../util/rdkit');

module.exports.show = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => {
    data = {
      cid: compound.cid,
      img: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + compound.cid + "/PNG",
      props: compound.data.props.map((prop) => ({
        label: prop.urn.label,
        name: prop.urn.name,
        value: prop.value.sval,
        img: prop.urn.label == 'SMILES' && rdkit.fromSmiles(prop.value.sval),
      }))
    };
    res.json(data);
  });
};

module.exports.query = function(req, res) {
  conditions = SEARCHABLE.map((searchable) => {
    const condition = {};
    condition[searchable] = req.query.query;
    return condition;
  });
  CompoundView.findAll({
    where: { $or: conditions }
  }).then((compounds) => {
    res.json(compounds.map((compound) => compound.cid));
  });
};
