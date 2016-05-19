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

  //TODO: remove this method
  check(req, res) {
    var User = req.app.get('models').User;

    User.findOne({uid: 'example01'}).then(function(users) {
      //if (err) { return res.json(err); }
      if (!users) { return res.json({ message: 'not found' }); }
      return res.render('users/login', { title: 'login', users: JSON.stringify(users) });
    });
  }

  authenticate(req, res, next) {
    req.app.get('passport').authenticate('local', function(err, user, info) {
      if (err) {
        return res.json(err);
      }
      if (!user) {
        console.log(info);
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: HttpStatus[HttpStatus.UNAUTHORIZED] });
      }

      //TODO: return JWT
      return res.send('ok');
    })(req, res, next);
  }
};
