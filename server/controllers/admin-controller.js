'use strict';

/**
 * AdminController
 */
class AdminController {
  index(req, res) {
    return res.render('admin/index', { title: 'admin' });
  }
};

module.exports = new AdminController();
