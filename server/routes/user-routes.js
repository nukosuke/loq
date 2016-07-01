'use strict';

/**
 * user routes
 */
module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/users', (req, res) => res.redirect('/users/'));
  router.get('/users/', controllers.user.index);

  /**
   * user profile page
   */
  router.get('/:uid/', (req, res) => res.redirect(`/${req.params.uid}`));
  router.get('/:uid', controllers.user.index);

  /**
   * require authenticate
   */
  router.get('/settings', middlewares.authenticator.requireJWT, controllers.user.settings);



  return router;
};
