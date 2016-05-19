'use strict';
var BaseController = require('./base-controller');

/**
 * AdminController
 */
class AdminController extends BaseController {
  index(req, res) {
    return res.render('admin/index', { title: 'admin' });
  }
};

module.exports = new AdminController();
