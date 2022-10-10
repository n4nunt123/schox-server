'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.Driver)
      Subscription.hasOne(models.User)
      Subscription.belongsTo(models.School)
    }
  }
  Subscription.init({
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    goHomeTime: DataTypes.STRING,
    toShoolTime: DataTypes.STRING,
    SchoolId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Schools"
      }
    },
    DriverId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Drivers"
      }
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};