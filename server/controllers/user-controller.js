'use strict';
var BaseController = require('./base-controller');

/**
 * UserController
 */
module.exports = class UserController extends BaseController {
  constructor(app) {
    super(app);
    this.requireJWT = this.requireJWT.bind(this);
  }

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
   * authentication hook
   *TODO: move to middlewares/authenticator.js
   */
  requireJWT(req, res, next) {
    this.middlewares.passport.authenticate('jwt', { session: false })(req, res, next);
  }

  /**
   * TODO:
   */
  authProviderRedirect(req, res, next) {}
  authProviderCallback(req, res, next) {}
};
