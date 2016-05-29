'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiArticleController extends BaseController {
  constructor(app) {
    super(app);
    this.status = this.middlewares.httpStatus;
    this.middlewares._.bindAll(this, 'index', 'show');
  }

  index(req, res) {
    this.models.Article
    .findAll()
    .then(articles => res.json({ articles }));
  }

  show(req, res) {
    this.models.Article
    .findOne({
      where: { id: req.params.id },
    })
    .then(article => {
      if (!article) {
        return res.status(this.status.NOT_FOUND).json({});
      }
      res.json({ article });
    });
  }
}
