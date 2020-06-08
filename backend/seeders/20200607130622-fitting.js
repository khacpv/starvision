'use strict';
const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   
   try {
     
    const du_bao = fs.readFileSync(appDir + "/du_bao.txt", "UTF-8");
    const du_bao_san_pham = fs.readFileSync(appDir + "/du_bao_san_pham.txt", "UTF-8");
    const data_dubaos = du_bao.split(/\r?\n/);
    const data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);
    data_du_bao_san_pham.forEach((dubaosanpham, index) => {
      
    });

    data_dubaos.forEach((dubao, index) => {
      
    });
  } catch (err) {
    console.error(err);
  }
  return true;
  // return queryInterface.bulkInsert("Customers", customerList, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
