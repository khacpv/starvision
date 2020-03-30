'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    group_user_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    dttc_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    action: DataTypes.INTEGER,
    export: DataTypes.INTEGER,
    wallpaper: DataTypes.STRING,
    fontname: DataTypes.STRING,
    fontsize: DataTypes.INTEGER,
    forecolor: DataTypes.INTEGER,
    backcolor: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    role_data: DataTypes.STRING,
    html_signature: DataTypes.STRING,
    signature: DataTypes.STRING,
    id_storage: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};