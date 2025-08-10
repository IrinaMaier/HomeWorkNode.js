'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      title:  { type: Sequelize.STRING,  allowNull: false },
      author: { type: Sequelize.STRING,  allowNull: false },
      year:   { type: Sequelize.INTEGER, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Books');
  }
};


