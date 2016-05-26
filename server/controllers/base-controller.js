'use strict';

/**
 * base class of all controller classes
 */
module.exports = class BaseController {
  constructor(models) {
    this.models = models || {};
  }
};
