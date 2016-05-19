/**
 * authenticate routes
 */
var express    = require('express');
var controller = require('../controllers/user-controller');
var router     = express.Router();

router.get('/login', controller.login);

router.post('/authenticate/token', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(
        HttpStatus.UNAUTHORIZED,
        { error: HttpStatus[HttpStatus.UNAUTHORIZED] }
      );
    }
  })(req, res, next);
});

//TODO:
//twitter & facebook & github strategy
//var existProvider = function(req, res) { req.params.provider in providers ? }
//router.post('/authenticate/oauth/:provider', );
//router.get('/authenticate/oauth/:provider/callback', );

module.exports = router;
