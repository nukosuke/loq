'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiArticleController extends BaseController {
  constructor(app) {
    super(app);
    this.logger = this.middlewares.logger;
    this.status = this.middlewares.httpStatus;
    this._      = this.middlewares._;
    this._.bindAll(this, 'index', 'show', 'create', 'update', 'delete');
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
    })
    .catch(err => {
      this.logger.error(err);
      return res.sendStatus(this.status.INTERNAL_SERVER_ERROR);
    });
  }

  create(req, res) {
    var form = this._.pick(req.body, [
      'published',
      'slug',
      'title',
      'body_markdown',
    ]);

    form.user_id = req.user.id;

    this.models.Article
    .create(form)
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      this.logger.error(err);
      return res.sendStatus(this.status.INTERNAL_SERVER_ERROR);
    });
  }

  //TODO: not implemented
  update(req, res) {
    res.sendStatus(this.status.NOT_IMPLEMENTED);
  }

  //TODO: not implemented
  delete(req, res) {
    res.sendStatus(this.status.NOT_IMPLEMENTED);
  }
}
