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
      mabacsi: {
        type: Sequelize.STRING
      },
      idbacsi: {
        type: Sequelize.STRING
      },
      khid: {
        type: Sequelize.STRING
      },
      iddttc: {
        type: Sequelize.STRING
      },
      ngaykham: {
        type: Sequelize.STRING
      },
      Ref_SPH_R: {
        type: Sequelize.DOUBLE
      },
      Ref_CYL_R: {
        type: Sequelize.DOUBLE
      },
      Ref_AX_R: {
        type: Sequelize.DOUBLE
      },
      BCVA_VA_R: {
        type: Sequelize.STRING
      },
      BCVA_SPH_R: {
        type: Sequelize.DOUBLE
      },
      BCVA_CYL_R: {
        type: Sequelize.DOUBLE
      },
      BCVA_AX_R: {
        type: Sequelize.DOUBLE
      },
      D_K1_R: {
        type: Sequelize.DOUBLE
      },
      D_K2_R: {
        type: Sequelize.DOUBLE
      },
      D_AVE_R: {
        type: Sequelize.DOUBLE
      },
      D_HVID_R: {
        type: Sequelize.DOUBLE
      },
      customOk_Lense_R: {
        type: Sequelize.STRING
      },
      customOk_Kcode_R: {
        type: Sequelize.STRING
      },
      customOk_Power_R: {
        type: Sequelize.STRING
      },
      customOk_Size_R: {
        type: Sequelize.STRING
      },
      Ref_SPH_L: {
        type: Sequelize.DOUBLE
      },
      Ref_CYL_L: {
        type: Sequelize.DOUBLE
      },
      Ref_AX_L: {
        type: Sequelize.DOUBLE
      },
      BCVA_VA_L: {
        type: Sequelize.STRING
      },
      BCVA_SPH_L: {
        type: Sequelize.DOUBLE
      },
      BCVA_CYL_L: {
        type: Sequelize.DOUBLE
      },
      BCVA_AX_L: {
        type: Sequelize.DOUBLE
      },
      D_K1_L: {
        type: Sequelize.DOUBLE
      },
      D_K2_L: {
        type: Sequelize.DOUBLE
      },
      D_AVE_L: {
        type: Sequelize.DOUBLE
      },
      D_HVID_L: {
        type: Sequelize.DOUBLE
      },
      customOk_Lense_L: {
        type: Sequelize.STRING
      },
      customOk_Kcode_L: {
        type: Sequelize.STRING
      },
      customOk_Power_L: {
        type: Sequelize.STRING
      },
      customOk_Size_L: {
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