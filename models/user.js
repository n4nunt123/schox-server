'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Subscription, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    houseCoordinate: DataTypes.STRING,
    childrenName: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    SubscriptionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Subscriptions"
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};