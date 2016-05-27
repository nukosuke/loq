'use strict';

/**
 * user routes
 */
module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/users', (req, res) => res.redirect('/users/'));
  router.get('/users/', controllers.user.index);
  router.get('/:username', controllers.user.show);

  /**
   * require authenticate
   */
  //router.get('/')
  router.get('/settings', middlewares.authenticator.requireJWT, controllers.user.settings);

  /**
   * JSON API
   */
  router.get('/api/users', controllers.api.user.index);
  //router.post('/api/settings/profile', controllers.user.setting.updateProfile);
  //router.post('/api/settings/password', controllers.user.setting.updatePassword);
  //router.post('/api/settings/authenticate/:provider', controller.updateAuthProvider);
  return router;
};
