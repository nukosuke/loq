'use strict';

/**
 * admin routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.get('/admin', controllers.admin.index);

  // JSON API
  //router.post('/settings/', controller.);
  //router.post('/settings/', controller.);

  return router;
};
