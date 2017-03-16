'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('compounds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data: Sequelize.JSON
    }).then(function() {
      return queryInterface.addIndex('compounds', ['cid'], {
        indexName: 'cid_index',
        indicesType: 'UNIQUE'
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('compounds');
  }
};
