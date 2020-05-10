'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_nicename: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_url: DataTypes.STRING,
    user_registered: DataTypes.DATE,
    user_activation_key: DataTypes.STRING,
    user_status: DataTypes.INTEGER,
    display_name: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};