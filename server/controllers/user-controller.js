'use strict';
var BaseController = require('./base-controller');
var HttpStatus     = require('http-status');
var jwt            = require('jsonwebtoken');

/**
 * UserController
 */
module.exports = class UserController extends BaseController {
  constructor() {
    super();
  }

  index(req, res) {
    res.render('users/index', { title: 'users' })
  }

  login(req, res) {
    res.render('users/login', { title: 'ログイン' })
  }

  authenticate(req, res, next) {
    var config    = req.app.get('config');
    var jwtConfig = config.authentication.JWT;
    var passport  = req.app.get('passport');

    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.json(err);
      }

      if (!user) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: HttpStatus[HttpStatus.UNAUTHORIZED] });
      }

      //TODO: remove unneccesary value from user and add JWT optionals in Strategy
      jwt.sign(user.toJSON(), jwtConfig.secretOrKey, jwtConfig.options, function(err, token) {
        if (err) {
          return res.json(err);
        }
        return res.json({ JWT: token });
      });
    })(req, res, next);
  }
};
