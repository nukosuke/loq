'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.get   ('/authenticate(/*)?' , controllers.user.index);

  /**
   * TODO: third IdP authentication
   */
  //app.get('/authenticate/:protocol/:provider', validator, redirect);
  //app.get('/authenticate/:protocol/:provider/callback', validator, redirect);

  return router;
};
