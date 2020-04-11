'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dttc = sequelize.define('Dttc', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.INTEGER,
    department: DataTypes.INTEGER,
    role: DataTypes.STRING,
    enable: DataTypes.INTEGER,
    agency: DataTypes.INTEGER
  }, {});
  Dttc.associate = function(models) {
    // associations can be defined here
  };
  return Dttc;
};