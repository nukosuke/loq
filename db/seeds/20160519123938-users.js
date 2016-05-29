'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 0,
      uid: 'example01',
      email: 'example01@example.com',
      password_hash: '$2a$10$nKFe8iKgeTiuCHxtVLGyReENIFr7527NpJSb/5ri/lD6PzR4nssUe', //example01
      name: 'example01',
      family_name: '',
      given_name: '',
      birthday: new Date('0000-00-00'),
      bio: 'hello, I am first user of this service. yay!',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
