'use strict';
var BaseController = require('./base-controller');

module.exports = class ArticleController extends BaseController {
  constructor(app) {
    super(app);
    this._ = this.middlewares._;
    this._.bindAll(this, 'index', 'show');
  }

  index(req, res) {
    res.render('articles/index', {
      title: 'articles',
      servers: this.config.config.servers,
    });
  }

  show(req, res) {

    res.render('articles/show', {
      title: 'articles show',
      servers: this.config.config.servers,
    });
  }
};
