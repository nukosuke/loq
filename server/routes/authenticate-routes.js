'use strict';

/**
 * authenticate routes
 */


module.exports = function(controllers) {
  var router = require('express').Router();

  router.get('/login', controllers.user.login);

  router.post('/authenticate/token', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(
          HttpStatus.UNAUTHORIZED,
          { error: HttpStatus[HttpStatus.UNAUTHORIZED] }
        );
      }
    })(req, res, next);
  });

//TODO:
//twitter & facebook & github strategy
//var existProvider = function(req, res) { req.params.provider in providers ? }
//app.post('/authenticate/oauth/:provider', );
//app.get('/authenticate/oauth/:provider/callback', );
  return router;
};
