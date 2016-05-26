'use strict';

/**
 * user routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.get('/users', controllers.user.index);
  router.get('/:username', controllers.user.show);

  /**
   * require authenticate
   */
  //router.get('/')
  router.get('/settings', controllers.user.requireJWT, controllers.user.settings);

  /**
   * JSON API
   */
  router.get('/api/users', controllers.user.apiIndex);
  //router.post('/api/settings/profile', controllers.user.setting.updateProfile);
  //router.post('/api/settings/password', controllers.user.setting.updatePassword);
  //router.post('/api/settings/authenticate/:provider', controller.updateAuthProvider);
  return router;
};
