'use strict';

/**
 * page route
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.get('/pages/:name', controllers.page.show);

  return router;
};
