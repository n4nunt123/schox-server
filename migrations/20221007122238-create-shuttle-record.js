'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShuttleRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      driverDepartAt: {
        type: Sequelize.DATE
      },
      driverPickupAt: {
        type: Sequelize.DATE
      },
      driverArriveAt: {
        type: Sequelize.DATE
      },
      SubscriptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Subscriptions"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShuttleRecords');
  }
};