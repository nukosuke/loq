'use strict';

/**
 * mailer configuration
 */
module.exports = {
  development: {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { // your gmail account
      user: '',
      pass: '',
    },
  },

  test: {
    // test mail server settings
  },

  production: {
    // production mail server settings
  },
};
