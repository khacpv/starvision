"use strict";
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
      let du_bao = fs.readFileSync(appDir + "/customerok.txt", "UTF-8");
      let du_bao_san_pham = fs.readFileSync(
        appDir + "/du_bao_san_pham.txt",
        "UTF-8"
      );
      let fitting_type = [163, 164];
      let data_dubaos = du_bao.split(/\r?\n/);
      let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

      data_dubaos.forEach((dubao, index) => {
        let spl = dubao.split("\t");
        spl.forEach((element, index) => {
          if (element == "NULL") {
            spl[index] = null;
          }
        });


        if (fitting_type.includes(Number(spl[9]))) {
          let count = 0;
          data_dubaos.forEach((dubao1, index1) => {
            let spl1 = dubao1.split("\t");
            if (spl[1] == spl1[1] && fitting_type.includes(Number(spl1[9]))) {
              count++;
            }
            if (count == 3){
              console.log(spl[1]);
              
            }
          });
        //   // fs.appendFileSync(appDir + "/customerok.txt", dubao + "\r\n");
        //   data_du_bao_san_pham.forEach((dubaosanpham, index) => {
        //     let spl_san_pham = dubaosanpham.split("\t");
        //     spl_san_pham.forEach((element, index) => {
        //       if (element == "NULL") {
        //         spl_san_pham[index] = null;
        //       }
        //     });

        //     if (Number(spl[9] == 163)){

        //     }
        //     if (Number(spl[9]) == 164){

        //     }
        //   });
        }
      });
    } catch (err) {
      console.error(err);
    }
    return true;
    // return queryInterface.bulkInsert("Customer", fitting_array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
