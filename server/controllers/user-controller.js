'use strict';
var BaseController = require('./base-controller');

/**
 * UserController
 */
module.exports = class UserController extends BaseController {
  constructor(app) {
    super(app);
    this._ = this.middlewares._;
    this._.bindAll(this, 'index', 'authenticate', 'show', 'settings');
  }

  index(req, res) {
    return res.render('users/index', {
      title: 'users',
      servers: this.config.config.servers,
    });
  }

  authenticate(req, res) {
    return res.render('users/authenticate', {
      title: 'welcome to loq!',
      servers: this.config.config.servers,
    });
  }

  show(req, res) {
    return res.render('users/show', {
      title: 'users',
      servers: this.config.config.servers,
    });
  }

  settings(req, res) {
    return res.render('users/settings', {
      title: 'user settings',
      servers: this.config.config.servers,
    });
  }

  /**
   * TODO:
   */
  authProviderRedirect(req, res, next) {}
  authProviderCallback(req, res, next) {}
};
