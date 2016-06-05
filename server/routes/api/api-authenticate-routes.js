'use strict';

/**
 * authenticate routes
 */
module.exports = function(controllers) {
  var router = require('express').Router();

  router.post  ('/authenticate/token', controllers.api.user.token);
  router.delete('/authenticate/token', (req, res) => res.json({message: 'not implemented'}));

  return router;
};
