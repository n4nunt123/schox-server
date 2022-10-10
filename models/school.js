'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      School.hasMany(models.Subscription)
    }
  }
  School.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      }
    },
    coordinate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Coordinate is required" },
        notEmpty: { msg: "Coordinate is required" },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Address is required" },
        notEmpty: { msg: "Address is required" },
      }
    }
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};