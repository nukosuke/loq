'use strict';

module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/', controllers.article.index);
  router.get('/:uid/articles/:year/:month/:day/:slug', controllers.article.show);
  //router.get('/:uid/feed', controllers.articles.atomFeed);

  router.get('/api/articles/'   , controllers.api.article.index);
  router.get('/api/articles/:id', controllers.api.article.show);

  var requireJWT = middlewares.authenticator.requireJWT;
  router.post  ('/api/articles/'   , requireJWT, controllers.api.article.create);
  router.put   ('/api/articles/:id', requireJWT, controllers.api.article.update);
  router.delete('/api/articles/:id', requireJWT, controllers.api.article.delete);

  return router;
};
