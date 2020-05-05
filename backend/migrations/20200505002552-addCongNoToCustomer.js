'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
     queryInterface.addColumn("Customers", "debt_last_month", Sequelize.DOUBLE),
     queryInterface.addColumn("Customers", "costs_incurred_this_month", Sequelize.DOUBLE),
     queryInterface.addColumn("Customers", "paid", Sequelize.DOUBLE),
     queryInterface.addColumn("Customers", "glass_money", Sequelize.DOUBLE),
     queryInterface.addColumn("Customers", "vtth_money", Sequelize.DOUBLE),
   ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
    queryInterface.removeColumn("Customers", "debt_last_month"),
    queryInterface.removeColumn("Customers", "costs_incurred_this_month"),
    queryInterface.removeColumn("Customers", "paid"),
    queryInterface.removeColumn("Customers", "glass_money"),
    queryInterface.removeColumn("Customers", "vtth_money"),
  ]);
  }
};
