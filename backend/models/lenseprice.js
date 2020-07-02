'use strict';
module.exports = (sequelize, DataTypes) => {
  const LensePrice = sequelize.define('LensePrice', {
    price: DataTypes.DOUBLE,
    status: DataTypes.INTEGER
  }, {});
  LensePrice.associate = function(models) {
    // associations can be defined here
  };
  return LensePrice;
};