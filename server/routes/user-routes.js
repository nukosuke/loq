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
  router.get('/:uid', controllers.user.show);

  /**
   * require authenticate
   */
  router.get('/settings', middlewares.authenticator.requireJWT, controllers.user.settings);



  /**
   * JSON API
   */
  router.get('/api/users/', controllers.api.user.index);

  //TODO: /api/users/:id_or_uid?key=(id|uid) [default: id]
  router.get('/api/users/:uid', controllers.api.user.show);

  //TODO: require token prevent from account bot
  router.post('/api/users/', controllers.api.user.create);
  
  /**
   * require authenticate
   */
  //router.put('/api/users/:id');

  //router.post('/api/settings/password', controllers.user.setting.updatePassword);
  //router.post('/api/settings/authenticate/:provider', controller.updateAuthProvider);
  return router;
};
