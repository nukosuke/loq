'use strict';

/**
 * user routes
 */
module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/users/', controllers.api.user.index);

  //TODO: /api/users/:id_or_uid?key=(id|uid) [default: id]
  router.get('/users/:uid', controllers.api.user.show);

  //TODO: require token prevent from account bot
  router.post('/users/', controllers.api.user.create);

  /**
   * require authenticate
   */
  //router.put('/api/users/:id');

  //router.post('/api/settings/password', controllers.user.setting.updatePassword);
  //router.post('/api/settings/authenticate/:provider', controller.updateAuthProvider);

  return router;
};
