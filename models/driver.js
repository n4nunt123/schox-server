'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.hasOne(models.Subscription, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    }
  }
  Driver.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
      }
    },
    carLicenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Car license number is required" },
        notEmpty: { msg: "Car license number is required" },
      }
    },
    carType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Car type is required" },
        notEmpty: { msg: "Car type is required" },
      }
    },
    imgUrl: DataTypes.STRING,
    carImgUrl: DataTypes.STRING,
    driverStatus: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  Driver.beforeCreate((driver, options) => {
    driver.password = hashPassword(driver.password)
  })
  return Driver;
};