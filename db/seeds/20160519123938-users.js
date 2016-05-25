'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 0,
      uid: 'example01',
      email: 'example01@example.com',
      password_hash: '',
      name: 'example01',
      bio: 'hello, I am first user of this service. yay!',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
