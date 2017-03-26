const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');
var rdkit = require('../../../util/rdkit');

var compoundToJson = (compound) => {
  json = {
    cid: compound.cid,
    img: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + compound.cid + "/PNG",
    name: compound.iupac_name_preferred,
    props: compound.data.props.map((prop) => ({
      label: prop.urn.label,
      name: prop.urn.name,
      value: prop.value.sval,
      // img: prop.urn.label == 'SMILES' && rdkit.fromSmiles(prop.value.sval),
    }))
  };
  Object.keys(SEARCHABLE).forEach((key) => {
    const data = SEARCHABLE[key]
    json.props.forEach((prop) => {
      if (prop.label == data.label && prop.name == data.name) {
        json[key] = prop.value
      }
    });
  });
  return json;
};

module.exports.show = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => res.json(compoundToJson(compound)));
};

module.exports.query = function(req, res) {
  conditions = Object.keys(SEARCHABLE).map((searchable) => ({
    [searchable]: { $like: `%${req.query.query}%` }
  }));
  CompoundView.findAll({
    where: { $or: conditions },
    limit: 10,
    order: 'molecular_weight'
  }).then((compounds) => (
    res.json(compounds
               .map((compound) => compoundToJson(compound))
               .map((compoundJson) => {
        Object.keys(SEARCHABLE).forEach((selectable) => {
          const value = compoundJson[selectable] || '';
          const startIndex = value.indexOf(req.query.query);
          if (startIndex >= 0) {
            compoundJson.match = {
              prop: selectable,
              startIndex: startIndex,
              endIndex: startIndex + req.query.query.length - 1,
            };
            return;
          }
        });
        return compoundJson;
      })
    )
  ));
};
