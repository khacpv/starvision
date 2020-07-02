'use strict';
module.exports = (sequelize, DataTypes) => {
  const LensePrice = sequelize.define('LensePrice', {
    price: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    type:DataTypes.STRING
  }, {});
  LensePrice.associate = function(models) {
    // associations can be defined here
  };
  return LensePrice;
};