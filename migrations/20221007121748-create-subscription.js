'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      goHomeTime: {
        type: Sequelize.STRING
      },
      toShoolTime: {
        type: Sequelize.STRING
      },
      SchoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Schools"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      DriverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Drivers"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Subscriptions');
  }
};