'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DTTCs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TENDTTC: {
        type: Sequelize.STRING
      },
      MADTTC: {
        type: Sequelize.STRING
      },
      DIACHI: {
        type: Sequelize.STRING
      },
      DIDONG: {
        type: Sequelize.STRING
      },
      EMAIL: {
        type: Sequelize.STRING
      },
      JD_CHUCVU: {
        type: Sequelize.INTEGER
      },
      JD_PHONGBAN: {
        type: Sequelize.INTEGER
      },
      QUYENNGUOIDUNG: {
        type: Sequelize.STRING
      },
      ENABLE_DTTC: {
        type: Sequelize.INTEGER
      },
      ID_CHINHANH: {
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
    return queryInterface.dropTable('DTTCs');
  }
};