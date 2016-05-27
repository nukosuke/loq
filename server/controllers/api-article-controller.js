'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiArticleController extends BaseController {
  constructor(app) {
    super(app);
    this.index = this.index.bind(this);
  }

  index(req, res) {
    this.models.Article
    .findAll()
    .then(articles => res.json({ articles }));
  }
}
