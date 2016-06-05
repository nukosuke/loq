'use strict';

module.exports = {
  development: {
    baseUrl: 'localhost:3000',
    servers: {
      api: 'localhost:3001',
      assets: 'localhost:3002',
    },
  },

  production: {
    baseUrl: '',
  },
};
