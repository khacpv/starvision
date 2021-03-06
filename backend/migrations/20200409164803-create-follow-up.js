'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FollowUps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followup_no: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      side: {
        type: Sequelize.STRING
      },
      bcva_va: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      thumb: {
        type: Sequelize.STRING
      },
      type: {
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
    return queryInterface.dropTable('FollowUps');
  }
};