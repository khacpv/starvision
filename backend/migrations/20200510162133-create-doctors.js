'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      doctor_name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      dttc_id: {
        type: Sequelize.INTEGER
      },
      doctor_id: {
        type: Sequelize.INTEGER
      },
      dttc_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      contract_code: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      email: {
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
    return queryInterface.dropTable('Doctors');
  }
};