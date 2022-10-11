"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TopUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TopUp.belongsTo(models.User);
    }
  }
  TopUp.init(
    {
      gross: DataTypes.INTEGER,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TopUp",
    }
  );
  return TopUp;
};
