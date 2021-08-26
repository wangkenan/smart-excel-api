'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('table', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      path: STRING(255),
      cate_id: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
