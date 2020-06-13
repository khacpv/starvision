'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRequest = sequelize.define('UserRequest', {
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    type: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {});
  UserRequest.associate = function(models) {
    // associations can be defined here
  };
  return UserRequest;
};