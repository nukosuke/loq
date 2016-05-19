'use strict';
var BaseController = require('./base-controller');

/**
 * AdminController
 */
module.exports = class AdminController extends BaseController {
  index(req, res) {
    return res.render('admin/index', { title: 'admin' });
  }
};
