'use strict';

/**
 * mailer configuration
 */
module.exports = {
  development: {
    // https://github.com/nodemailer/nodemailer#set-up-smtp
    smtp: {
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { // your gmail account
        user: '',
        pass: '',
      },
    },
    // https://github.com/nodemailer/nodemailer#e-mail-message-fields
    fields: {
      from: 'noreply@example.com'
    }
  },

  test: {
    // test mail server settings
  },

  production: {
    // production mail server settings
  },
};
