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
   queryInterface.addColumn("OrderLenses", "paid", Sequelize.DOUBLE),
   queryInterface.addColumn("OrderLenses", "glass_money", Sequelize.DOUBLE),
   queryInterface.addColumn("OrderLenses", "amount", Sequelize.DOUBLE),
   ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   queryInterface.removeColumn("OrderLenses", "paid"),
   queryInterface.removeColumn("OrderLenses", "glass_money")
   queryInterface.removeColumn("OrderLenses", "amount")
  }
};
