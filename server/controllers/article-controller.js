'use strict';
var BaseController = require('./base-controller');

module.exports = class ArticleController extends BaseController {
  constructor(app) {
    super(app);
  }

  index(req, res) {
    res.render('articles/index', { title: 'articles' });
  }
};
