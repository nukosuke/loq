'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) { //TODO: (controllers, middlewares)
  var router = require('express').Router();

  router.get('/authenticate(/*)?', controllers.user.authenticate);

  //TODO: create AuthController
  router.post('/authenticate/token', controllers.user.authenticateByPassword);
  router.delete('/authenticate/token', (req, res) => res.json({message: 'not implemented'}));

  router.get(
    '/jwtTest',
    controllers.user.authenticateByJWT,
    controllers.user.needJwtRoute
  );
  //TODO:
  //twitter & facebook & github strategy
  //var existProvider = function(req, res) { req.params.provider in providers ? }
  //app.post('/authenticate/oauth/:provider', );
  //app.get('/authenticate/oauth/:provider/callback', );

  return router;
};
