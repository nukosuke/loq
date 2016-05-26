'use strict';

/**
 * base class of all controller classes
 */
module.exports = class BaseController {
  constructor(app) {
    if (app) {
      this.config      = app.get('config')      || {};
      this.models      = app.get('models')      || {};
      this.middlewares = app.get('middlewares') || {};
    } else {
      this.config = this.models = this.middlewares = {};
    }
  }
};
