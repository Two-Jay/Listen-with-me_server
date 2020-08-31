'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccumulateAudience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AccumulateAudience.init({
    room_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER,
    listener_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccumulateAudience',
  });
  return AccumulateAudience;
};