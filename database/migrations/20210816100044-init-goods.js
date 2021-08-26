'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, FLOAT, BIGINT } = Sequelize;
    await queryInterface.createTable('goods', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      goods_id: BIGINT,
      title: STRING(255),
      link_url: STRING(255),
      image_url: STRING(255),
      type: STRING(255),
      group: STRING(255),
      group_name: STRING(255),
      visitor_num: INTEGER,
      pay_piece_num: INTEGER,
      pay_people_num: INTEGER,
      pay_amount_num: FLOAT(11),
      pay_transform_percentage: STRING(10),
      atv_num: INTEGER,
      search_num: INTEGER,
      search_percentage: STRING(10),
      repurchase_num: INTEGER,
      repurchase_percentage: STRING(10),
      collect_num: INTEGER,
      collect_percentage: STRING(10),
      uv_value: FLOAT(11),
      cate_id: INTEGER,
      table_id: INTEGER,
      date: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('goods');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
