'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likedList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  likedList.init({
    user_id: DataTypes.INTEGER,
    likedList_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likedList',
  });
  return likedList;
};