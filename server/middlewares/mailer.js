'use strict';
var Middleware    = require('./middleware');
var path          = require('path');
var fs            = require('fs');
var _             = require('lodash');
var nodemailer    = require('nodemailer');
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

    //TODO: env have to be set in server/index.js
    var transporter = nodemailer.createTransport(this.config.mailer.smtp);

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

        this.senders[key] = transporter.templateSender(new EmailTemplate(templateDir));
      }
    });

    transporter.on('idle', () => {
      while(transporter.isIdle() && this.queue.length) {
        var message = this.queue.shift();

        this.senders[message.template](message.fields, message.context)
        //TODO: .then() logging
        ;
      }
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
  }
}
