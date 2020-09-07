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
      profileURL: {
        type: DataTypes.STRING,
        defaultValue:
          "https://lwm-test.s3.ap-northeast-2.amazonaws.com/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%2C+2020-09-07+13-20-34.png",
      },
      profileDescription: {
        type: DataTypes.STRING,
        defaultValue: `안녕하세요. ${data.nickname}입니다.`,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
