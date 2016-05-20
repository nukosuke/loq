'use strict';
var BaseController = require('./base-controller');

/**
 * PageController
 */
module.exports = class PageController extends BaseController {
  show(req, res) {
    res.render(`pages/${req.params.name}`, {});
  }
};
