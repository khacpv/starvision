'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fittings', {
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
      fitting_no: {
        type: Sequelize.STRING
      },
      referaction_sph: {
        type: Sequelize.DOUBLE
      },
      referaction_cyl: {
        type: Sequelize.DOUBLE
      },
      referaction_ax: {
        type: Sequelize.STRING
      },
      bcva_va: {
        type: Sequelize.STRING
      },
      bcva_sph: {
        type: Sequelize.DOUBLE
      },
      bcva_cyl: {
        type: Sequelize.DOUBLE
      },
      bcva_ax: {
        type: Sequelize.STRING
      },
      side: {
        type: Sequelize.STRING
      },
      kcode: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      comment_size: {
        type: Sequelize.STRING
      },
      comment_matbo: {
        type: Sequelize.STRING
      },
      comment_vung_dieu_tri: {
        type: Sequelize.STRING
      },
      comment_di_chuyen: {
        type: Sequelize.STRING
      },
      comment_ket_luan: {
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
    return queryInterface.dropTable('Fittings');
  }
};