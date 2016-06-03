'use strict';
var BaseController = require('./base-controller');

module.exports = class ApiUserController extends BaseController {
  constructor(app) {
    super(app);
    this.status = this.middlewares.httpStatus;
    this._      = this.middlewares._;
    this._.bindAll(this,
      'index',
      'show',
      'create',
      'update',
      'token'
    );
  }

  index(req, res) {
    this.models.User
    .findAll()
    .then(users => res.json({ users }));
  }

  show(req, res) {
    this.models.User
    .findOne({
      where: { uid: req.params.uid },
      include: [{
        model: this.models.Article,
        required: false,
      }],
    })
    .then(user => {
      if(!user) {
        return res.status(this.status.NOT_FOUND).json({});
      }
      return res.json({ user });
    });
  }

  /**
   * require write access level
   */
  create(req, res) {
    var form = this._.pick(req.body, [
      'uid',
      'email',
      'password',
      'password_confirm'
    ]);

    /* check on both client & server */
    if(form.password !== form.password_confirm) {
      return res.status(400).json({
        error: 'The initial password and the re-typed password do not match.'
      });
    }

    this.models.User
    .create({
      uid:      form.uid,
      name:     form.uid,
      email:    form.email,
      password: form.password,
    })
    .then(user => {
      this.middlewares.mailer.push({
        template: 'EmailConfirmation',
        fields: {
          from: this.config.mailer.fields.from,
          to:   user.email,
        },
        context: {
          name: user.uid,
          uid:  user.uid,
          confirmationLink: `${this.config.config.baseUrl}/authenticate/confirm_email`,
        },
      });
      return res.redirect('/authenticate/check_your_inbox');
      //TODO: welcome page
      // sent email. please confirm your address.
    });
  }

  update(req, res) {
    var form = this._.pick(req.body, [
      ''
    ]);
  }

  /**
   * authenticate and publish JWT
   */
  token(req, res, next) {
    var authenticator = this.middlewares.authenticator;
    authenticator.local(req, res, next);
  }
}
