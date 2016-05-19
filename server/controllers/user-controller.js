/**
 * UserController
 */
module.exports = {
  index: function(req, res) {
    res.render('users/index', { title: 'users' })
  },

  login: function(req, res) {
    res.render('users/login', { title: 'ログイン' })
  },

  //TODO: remove this method
  check: function(req, res) {
    var User = req.app.get('models').User;

    User.findOne({uid: 'example01'}).then(function(users) {
      //if (err) { return res.json(err); }
      if (!users) { return res.json({ message: 'not found' }); }
      return res.render('users/login', { title: 'login', users: JSON.stringify(users) });
    });
  },

  /**
   * authenticate methods
   */
  passwordAuth: null,
  jwtAuth: null,
}
