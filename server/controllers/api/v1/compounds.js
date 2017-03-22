const Compound = require('../../../models/compound');
var rdkit = require('../../../util/rdkit');

module.exports.show = function(req, res){
  Compound.findOne({
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
