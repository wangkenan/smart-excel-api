'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      user_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      mobile: STRING(30),
      password: STRING(30),
      code:STRING(30),
      last_login: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
