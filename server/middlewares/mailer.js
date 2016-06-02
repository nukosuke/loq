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
  constructor(app, logger) {
    super(app);
    this.logger = logger;

    //TODO: use Queueing system
    this.senders = {};
    this.queue   = [];

    this.transporter = nodemailer.createTransport(smtpPool(this.config.mailer.smtp));

    var promise = new Promise(resolve => {
      this.transporter.verify(err => {
        if (err) {
          this.logger.error('failed to connect smtp server: ' + err);
        } else {
          this.logger.info('connected to smtp server');
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
            this.logger.info(`sent mail template=${message.template}`);
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
