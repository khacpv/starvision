'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_user_id: {
        type: Sequelize.INTEGER
      },
      department_id: {
        type: Sequelize.INTEGER
      },
      dttc_id: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      action: {
        type: Sequelize.INTEGER
      },
      export: {
        type: Sequelize.INTEGER
      },
      wallpaper: {
        type: Sequelize.STRING
      },
      fontname: {
        type: Sequelize.STRING
      },
      fontsize: {
        type: Sequelize.INTEGER
      },
      forecolor: {
        type: Sequelize.INTEGER
      },
      backcolor: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.INTEGER
      },
      role_data: {
        type: Sequelize.STRING
      },
      html_signature: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      id_storage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};