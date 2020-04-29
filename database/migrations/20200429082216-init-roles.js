'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {  
    await queryInterface.dropTable('roles');
  }
};
