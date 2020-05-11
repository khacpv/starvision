"use strict";

const users = require("./user");
var bcrypt = require("bcryptjs");

const doctors = require("./doctor");
var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    let listUser = [];
    let i = 0;
    users.forEach((element) => {
      let doctor = null;
      doctors.forEach(item => {
        if (Number(item.userWebId) == element.ID){
          i++;
          doctor = item;
          // console.log(i);
        }
      });

      listUser.push({
        id: element.ID,
        username: element.user_login,
        password: doctor != null ? bcrypt.hashSync(doctor.Pwd, salt): element.user_pass,
        user_nicename: element.user_nicename,
        user_email: element.user_email,
        user_url: element.user_url,
        user_registered: element.user_registered,
        user_activation_key: element.user_activation_key,
        user_status: element.user_status,
        display_name: element.display_name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return queryInterface.bulkInsert("Users", listUser, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
