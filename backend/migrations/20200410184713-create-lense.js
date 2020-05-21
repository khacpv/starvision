'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lense: {
        type: Sequelize.STRING
      },
      kcode: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.STRING
      },
      side: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      prefix:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lenses');
  }
};