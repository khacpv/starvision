'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerOks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refactometer_sph: {
        type: Sequelize.STRING
      },
      refactometer_cyl: {
        type: Sequelize.STRING
      },
      refactometer_ax: {
        type: Sequelize.STRING
      },
      bcva_va: {
        type: Sequelize.STRING
      },
      bcva_sph: {
        type: Sequelize.STRING
      },
      bcva_cyl: {
        type: Sequelize.STRING
      },
      bcva_ax: {
        type: Sequelize.STRING
      },
      original_k1: {
        type: Sequelize.STRING
      },
      original_k2: {
        type: Sequelize.STRING
      },
      original_ave: {
        type: Sequelize.STRING
      },
      original_hvid: {
        type: Sequelize.STRING
      },
      lense: {
        type: Sequelize.STRING
      },
      k_code: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.STRING
      },
      size: {
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
    return queryInterface.dropTable('CustomerOks');
  }
};