'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn("Users", "latitude", { type: Sequelize.DataTypes.STRING })
     await queryInterface.addColumn("Schools", "latitude", { type: Sequelize.DataTypes.STRING })
     await queryInterface.addColumn("Users", "longitude", { type: Sequelize.DataTypes.STRING })
     await queryInterface.addColumn("Schools", "longitude", { type: Sequelize.DataTypes.STRING })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
