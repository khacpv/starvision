'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FollowUpChecks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_code: {
        type: Sequelize.STRING
      },
      doctor_id: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      dttc_id: {
        type: Sequelize.STRING
      },
      date_examination: {
        type: Sequelize.STRING
      },
      re_examination_date: {
        type: Sequelize.STRING
      },
      id_left: {
        type: Sequelize.INTEGER
      },
      id_right: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('FollowUpChecks');
  }
};