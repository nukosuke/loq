var HttpStatus    = require('http-status');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy   = require('passport-jwt').Strategy;
var ExtractJwt    = JwtStrategy.ExtractJwt;

/**
 * passport configuration
 */
module.exports = function(app, passport, config) {

  /**
   * user authorize by (uid || email) and password
   * response header contains JWT
   * after this authentication, all API access must be performed with JWT
   */
  passport.use(new LocalStrategy(function(identifier, password, done) {
    var User = app.get('models').User;

    // enable authentication by both uid and email
    var select = (identifier.indexOf('@') != -1) ? { email: identifier } : { uid: identifier };

    User.findOne(select, function(user, err) {
      if (err) {
        return done(err);
      }
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'ユーザ名かパスワードが間違っています' })
      }
      return done(null, user);
    });
  }));

  /**
   * Json Web Token Strategy
   * used to all API access except first JWT request
   */
  passport.use(new JwtStrategy(config.authentication.JWT, function(jwtPayload, done) {
    User.findOne({ uid: jwtPayload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
        //TODO: redirect to signup page
      }
    });
  }));
};