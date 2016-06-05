'use strict';

module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/articles/'   , controllers.api.article.index);
  router.get('/articles/:id', controllers.api.article.show);

  var requireJWT = middlewares.authenticator.requireJWT;
  router.post  ('/articles/'   , requireJWT, controllers.api.article.create);
  router.put   ('/articles/:id', requireJWT, controllers.api.article.update);
  router.delete('/articles/:id', requireJWT, controllers.api.article.delete);

  return router;
};
