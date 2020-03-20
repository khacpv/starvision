'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define('Clinic', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Clinic.associate = function(models) {
    // associations can be defined here
  };
  return Clinic;
};