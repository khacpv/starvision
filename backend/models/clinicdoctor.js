'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClinicDoctor = sequelize.define('ClinicDoctor', {
    userId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER
  }, {});
  ClinicDoctor.associate = function(models) {
    // associations can be defined here
  };
  return ClinicDoctor;
};