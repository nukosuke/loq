'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) { //TODO: (controllers, middlewares)
  var router = require('express').Router();

  router.get   ('/authenticate(/*)?' , controllers.user.authenticate);
  router.post  ('/authenticate/token', controllers.user.token);
  router.delete('/authenticate/token', (req, res) => res.json({message: 'not implemented'}));

  //TODO:
  //twitter & facebook & github strategy
  //var existProvider = function(req, res) { req.params.provider in providers ? }
  //app.post('/authenticate/oauth/:provider', );
  //app.get('/authenticate/oauth/:provider/callback', );

  return router;
};
