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
  //router.post('/settings/profile', controllers.user.setting.updateProfile);
  //router.post('/settings/password', controllers.user.setting.updatePassword);
  //router.post('/settings/oauth/:provider', controller.updateOauthProvider);
  return router;
};
