const Compound = require('../models/compound');

module.exports.index = function(req, res){
  Compound.findAll({
    offset: req.query.offset, limit: req.query.limit
  }).then(compounds => {
    res.render('compounds', { compounds });
  })
}
