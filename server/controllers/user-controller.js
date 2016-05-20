'use strict';
var BaseController = require('./base-controller');
var HttpStatus = require('http-status');

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
    req.app.get('passport').authenticate('local', function(err, user, info) {
      if (err) {
        return res.json(err);
      }
      if (!user) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: HttpStatus[HttpStatus.UNAUTHORIZED] });
      }

      //TODO: return JWT
      return res.send('ok');
    })(req, res, next);
  }
};
