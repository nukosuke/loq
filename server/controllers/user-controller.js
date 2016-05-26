'use strict';
var BaseController = require('./base-controller');

/**
 * UserController
 */
module.exports = class UserController extends BaseController {
  index(req, res) {
    return res.render('users/index', { title: 'users' });
  }

  authenticate(req, res) {
    return res.render('users/authenticate', { title: 'welcome to loq!' });
  }

  show(req, res) {
    return res.render('users/show', { title: 'users' });
  }

  settings(req, res) {
    return res.render('users/settings', { title: 'user settings'});
  }

  /**
   * TODO:
   */
  authProviderRedirect(req, res, next) {}
  authProviderCallback(req, res, next) {}
};
