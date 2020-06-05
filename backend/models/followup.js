'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowUp = sequelize.define('FollowUp', {
    followup_no: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    side: DataTypes.STRING,
    bcva_va: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    thumb: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  FollowUp.associate = function(models) {
    // associations can be defined here
  };
  return FollowUp;
};