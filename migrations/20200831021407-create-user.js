"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      OauthType: {
        type: Sequelize.INTEGER,
      },
      profileURL: {
        type: Sequelize.STRING,
        defaultValue:
          "https://lwm-test.s3.ap-northeast-2.amazonaws.com/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%2C+2020-09-07+13-20-34.png",
      },
      profileDescription: {
        type: Sequelize.STRING,
        defaultValue: `안녕하세요. ${data.nickname}입니다.`,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
