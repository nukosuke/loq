'use strict';

/**
 * user routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  //TODO: remove this
  router.get('/check', controllers.user.check);

  router.get('/', controllers.user.index);
  //router.get('/:username', controller.show);

  // require authenticate
  //TODO: use passport to authenticate
  //TODO: users/settings-controller.js
  //router.get('/settings', controller);
  // JSON API
  //router.post('/settings/profile', controller.updateProfile);
  //router.post('/settings/password', controller.updatePassword);
  //router.post('/settings/oauth/:provider', controller.updateOauthProvider);
  return router;
};
