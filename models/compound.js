const Sequelize = require('sequelize');
const sq = require('../sq');

const Compound = sq.define('compound', {
  cid: Sequelize.INTEGER,
  data: Sequelize.JSON,
}, {
  createdAt: false,
  timestamps: false,
});

module.exports = Compound;
