'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiUserController extends BaseController {
  constructor(app) {
    super(app);
    this.index = this.index.bind(this);
    this.show  = this.show.bind(this);
    this.token = this.token.bind(this);
  }

  index(req, res) {
    this.models.User.findAll()
    .then(function(users) {
      return res.json({ users });
    });
  }

  show(req, res) {
    this.models.User
    .findOne({ where: req.params.id })
    .then(function(user) {
      if(!user) {
        return res
        .status(httpStatus.NOT_FOUND)
        .json({ user: {} });
      }
      return res
      .status(httpStatus.OK)
      .json({ user });
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
