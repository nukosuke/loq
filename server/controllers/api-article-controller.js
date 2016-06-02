'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiArticleController extends BaseController {
  constructor(app) {
    super(app);
    this.status = this.middlewares.httpStatus;
    this._      = this.middlewares._;
    this._.bindAll(this, 'index', 'show');
  }

  index(req, res) {
    var query = this._.pick(req.query, [
      'user_id',
      //tag_id,
      'limit',
    ]);

    this.models.Article
    .findAll({
      //where: { query },
      include: [{ model: this.models.User }],
    })
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
