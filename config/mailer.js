'use strict';

/**
 * mailer configuration
 */
module.exports = {
  development: {
    // https://github.com/nodemailer/nodemailer#set-up-smtp
    smtp: {
      pool: true,
      //host: 'smtp.gmail.com',
      //port: 465,
      //secure: true,
      service: 'gmail',
      auth: { // your gmail account
        user: '',
        pass: '',
      },
      maxConnections: 5,
      maxMessages: 10,
      rateLimit: 5,
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
