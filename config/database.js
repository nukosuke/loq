'use strict';

/**
 * database
 * configuration
 */
module.exports = {
  development: {
    storage: 'db/development.db',
    dialect: 'sqlite',
  },

  test: {
    storage: 'db/test.db',
    dialect: 'sqlite',
  },

  production: {
    url: process.env.DATABASE_URL,
    pool: {
      max: 5,
      min: 0,
      idle: 100000,
    },
  },
};
