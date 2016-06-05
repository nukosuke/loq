'use strict';

module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/', controllers.article.index);
  router.get('/:uid/articles/:year/:month/:day/:slug', controllers.article.show);
  //router.get('/:uid/feed', controllers.articles.atomFeed);

  return router;
};
