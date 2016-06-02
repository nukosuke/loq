'use strict';

/**
 * base class for middlewares
 */
module.exports = class Middleware {
  constructor(app) {
    if (app) {
      this.config    = app.get('config')    || {};
      this.constants = app.get('constants') || {};
      this.models    = app.get('models')    || {};
    } else {
      this.config = this.models = {};
    }
  }
};
