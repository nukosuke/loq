'use strict';
var Middleware    = require('./middleware');
var path          = require('path');
var fs            = require('fs');
var _             = require('lodash');
var nodemailer    = require('nodemailer');
var smtpPool      = require('nodemailer-smtp-pool');
var EmailTemplate = require('email-templates').EmailTemplate;

/**
 * mailer middleware
 */
module.exports = class Mailer extends Middleware {
  constructor(app) {
    super(app);

    //TODO: use Queueing system
    this.senders = {};
    this.queue   = [];

    this.transporter = nodemailer.createTransport(smtpPool(this.config.mailer.smtp));

    var promise = new Promise(resolve => {
      this.transporter.verify(err => {
        if (err) {
          console.log(err);
        } else {
          //TODO: use punctual logger
          //logger.info();
          console.log('Server is ready to take our messages');
        }
        resolve();
      });
    }).then(() => {
      /**
       * load template & create template senders
       */
      var templateBase = path.join(app.get('constants').rootdir, 'server', 'views', 'mail');

      fs.readdirSync(templateBase).forEach(name => {
        var templateDir = path.join(templateBase, name);

        if(fs.statSync(templateDir).isDirectory()) {
          var key = name
          .replace('.js', '')
          .split('-')
          .map(term => term[0].toUpperCase() + term.slice(1))
          .join('');

          this.senders[key] = this.transporter.templateSender(new EmailTemplate(templateDir));
        }
      });

    }).then(() => {
      /**
       * register 'idle' event handler
       */
      this.transporter.on('idle', () => {
        while(this.transporter.isIdle() && this.queue.length) {
          var message = this.queue.shift();

          this.senders[message.template](message.fields, message.context)
          .then(() => {
            //TODO: logging
            console.log('sent');
          });
        }
      });
    });
  }

  /**
   * message
   * - template : template name in form of PascalCamel
   * - fields   : message fields
   * - context  : context data for replacement
   */
  push(message) {
    this.queue.push(message);
    this.transporter.emit('idle');
  }
}
