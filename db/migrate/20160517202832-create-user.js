'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      family_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      given_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: '0000-00-00',
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      url: {
        type: Sequelize.STRING,
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
    return queryInterface.addIndex('Users', ['uid', 'email']);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
