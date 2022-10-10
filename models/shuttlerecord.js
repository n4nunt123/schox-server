'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShuttleRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShuttleRecord.belongsTo(models.Subscription)
    }
  }
  ShuttleRecord.init({
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    driverPickupAt: DataTypes.DATE,
    driverArriveAt: DataTypes.DATE,
    SubscriptionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Subscriptions"
      }
    }
  }, {
    sequelize,
    modelName: 'ShuttleRecord',
  });
  return ShuttleRecord;
};