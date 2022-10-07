'use strict';
const {
  Model
} = require('sequelize');
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
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    carLicenseNumber: DataTypes.STRING,
    carType: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    carImgUrl: DataTypes.STRING,
    driverStatus: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};