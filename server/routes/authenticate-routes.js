'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) { //TODO: (controllers, middlewares)
  var router = require('express').Router();

  router.get   ('/authenticate(/*)?' , controllers.user.authenticate);

  router.post  ('/api/authenticate/token', controllers.api.user.token);
  router.delete('/api/authenticate/token', (req, res) => res.json({message: 'not implemented'}));

  /**
   * TODO: third IdP authentication
   */
  //app.get('/authenticate/:protocol/:provider', validator, redirect);
  //app.get('/authenticate/:protocol/:provider/callback', validator, redirect);

  return router;
};
