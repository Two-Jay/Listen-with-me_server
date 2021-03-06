"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      OauthType: DataTypes.INTEGER,
      profileURL: DataTypes.STRING,
      profileDescription: {
        type: DataTypes.STRING,
        defaultValue: `안녕하세요`,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
