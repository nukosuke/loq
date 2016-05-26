var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy   = require('passport-jwt').Strategy;
var ExtractJwt    = JwtStrategy.ExtractJwt;

/**
 * passport configuration
 *TODO: classify
 */
module.exports = function(app, passport) {
  //TODO:
  //constructor(app, config, passport) {
  //this.passport = require('passport');
  var config = app.get('config');

  /**
   * user authorize by (uid || email) and password
   * response header contains JWT
   * after this authentication, all API access must be performed with JWT
   */
  passport.use(new LocalStrategy(
    {
      usernameField: 'identifier',
      passwordField: 'password',
      session: false,
    },
    function(identifier, password, done) {
      var User = app.get('models').User;

      /**
       * enable authentication by both uid and email
       *TODO: this should be checked on client side
       */
      var select = (identifier.indexOf('@') != -1) ? { email: identifier } : { uid: identifier };

      //TODO: fetch only ['id', 'scope']
      User.findOne({ where: select }).then(function(user) {
        if (!user) {
          return done(null, false, { message: 'ユーザ名かパスワードが間違っています' });
        }
        user.authenticate(password, function(err, isValid) {
          if (err) {
            return done(err);
          }
          if (!isValid) {
            return done(null, false, { message: 'ユーザ名かパスワードが間違っています' });
          }
          return done(null, user);
        });
      });
    }
  ));

  /**
   * Json Web Token Strategy
   * used to all API access except first JWT request
   */
  var jwtConfig = config.authentication.JWT;
  passport.use(new JwtStrategy(
    {
      secretOrKey:    jwtConfig.secretOrKey,
      jwtFromRequest: jwtConfig.jwtFromRequest,
      issuer:         jwtConfig.options.issuer,
      audience:       jwtConfig.options.audience,
      algorithms:     [jwtConfig.options.algorithm],
    },
    function(payload, done) {
      var User = app.get('models').User;

      User.findOne({ where: { uid: payload.uid } }).then(function(user) {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
          //TODO: redirect to signup page
        }
      });
    }
  ));

  //this.requireJWT.bind(this);
  // } // end of constructor

  //TODO: passport OAuth, OpenID Connect

  //TODO: rename this file to authenticator.js

  //TODO:
  //return authenticator;
  //authenticator = {
  // local: passport.authenticate('local'),
  // jwt: passport.authenticate('jwt'),
  //}

  //TODO:
  //from UserController
  //requireJWT(req, res, next) {}
};
