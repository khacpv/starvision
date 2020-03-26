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
      ID_NGUOIDUNG_NHOM: {
        type: Sequelize.INTEGER
      },
      ID_PHONGBAN: {
        type: Sequelize.INTEGER
      },
      ID_DTTC: {
        type: Sequelize.INTEGER
      },
      TEN_DTTC: {
        type: Sequelize.STRING
      },
      EMAIL: {
        type: Sequelize.STRING
      },
      FULLNAME: {
        type: Sequelize.STRING
      },
      TAIKHOAN: {
        type: Sequelize.STRING
      },
      MATKHAU: {
        type: Sequelize.STRING
      },
      HOATDONG: {
        type: Sequelize.INTEGER
      },
      XUATDULIEU: {
        type: Sequelize.INTEGER
      },
      HINHNEN: {
        type: Sequelize.STRING
      },
      FONTNAME: {
        type: Sequelize.STRING
      },
      FONTSIZE: {
        type: Sequelize.FLOAT
      },
      FORECOLOR: {
        type: Sequelize.INTEGER
      },
      BACKCOLOR: {
        type: Sequelize.INTEGER
      },
      GHICHU: {
        type: Sequelize.TEXT
      },
      QUYEN: {
        type: Sequelize.INTEGER
      },
      QUYENDULIEU: {
        type: Sequelize.STRING
      },
      HTMLCHUKY: {
        type: Sequelize.STRING
      },
      CHUKY: {
        type: Sequelize.STRING
      },
      ID_KHO: {
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