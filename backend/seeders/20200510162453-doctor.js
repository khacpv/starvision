'use strict';
var bcrypt = require("bcryptjs");

const users = require("./doctor");
var salt = bcrypt.genSaltSync(10);
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
   let listUser = [];
    users.forEach((element) => {
      console.log(element.customer_MaKH);

      listUser.push({
        id: element.Id,
        name: element.customer_name,
        code: element.customer_MaKH,
        user_id: element.userWebId !=null ? element.userWebId : "",
        department_name: element.TenVietTat,
        address: element.Diachi != null ? element.Diachi : "",
        dttc_id: element.Id_Dttc,
        doctor_id: element.Id_bacsi,
        dttc_name: element.Ten_DTTC,
        phone: element.Sodienthoai,
        username: element.Username !=null  ? element.Username : "",
        password: element.Pwd !=null  ? element.Pwd : "",
        contract_code: element.MaHD,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return queryInterface.bulkInsert("Doctors", listUser, {});
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
