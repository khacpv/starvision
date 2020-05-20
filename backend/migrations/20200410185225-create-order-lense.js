'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderLenses', {
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
      id_lense_left: {
        type: Sequelize.INTEGER
      },
      id_lense_right: {
        type: Sequelize.INTEGER
      },
      order_number: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.INTEGER
      },
      note:{
        type: Sequelize.TEXT
      },
      type:{
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
    return queryInterface.dropTable('OrderLenses');
  }
};