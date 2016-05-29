'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('articles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: '',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      body_markdown: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
    return queryInterface.addIndex('articles', ['user_id', 'published', 'published_at', 'slug']);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('articles');
  }
};
