'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.get('/login', controllers.user.login);
  router.post('/authenticate/token', controllers.user.authenticate);

  //TODO:
  //twitter & facebook & github strategy
  //var existProvider = function(req, res) { req.params.provider in providers ? }
  //app.post('/authenticate/oauth/:provider', );
  //app.get('/authenticate/oauth/:provider/callback', );

  return router;
};
