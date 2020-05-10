'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctors = sequelize.define('Doctors', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthday: DataTypes.STRING,
    code: DataTypes.STRING,
    user_id: DataTypes.STRING,
    doctor_name: DataTypes.STRING,
    address: DataTypes.STRING,
    dttc_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    dttc_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    contract_code: DataTypes.STRING,
    role: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    email: DataTypes.STRING
  }, {});
  Doctors.associate = function(models) {
    // associations can be defined here
  };
  return Doctors;
};