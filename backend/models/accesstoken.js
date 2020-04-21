'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    user_id: DataTypes.STRING,
    access_token: DataTypes.TEXT,
    is_active: DataTypes.INTEGER
  }, {});
  AccessToken.associate = function(models) {
    // associations can be defined here
  };
  return AccessToken;
};