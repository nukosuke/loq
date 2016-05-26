'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiUserController extends BaseController {
  constructor(app) {
    super(app);
    this.index = this.index.bind(this);
    this.token = this.token.bind(this);
  }

  index(req, res) {
    this.models.User.findAll().then(function(users) {
      res.json({ users });
    });
  }

  /**
   * authenticate and publish JWT
   */
  token(req, res, next) {
    var authenticator = this.middlewares.authenticator;
    authenticator.local(req, res, next);
  }
}
