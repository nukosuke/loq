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
  passport.use(new LocalStrategy(
    {
      usernameField: 'identifier',
      passwordField: 'password',
      session: false,
    },
    function(identifier, password, done) {
      var User = app.get('models').User;
      // enable authentication by both uid and email
      var select = (identifier.indexOf('@') != -1) ? { email: identifier } : { uid: identifier };

      //TODO: fetch only ['id', 'scope']
      User.findOne({ where: select }).then(function(user) {
        //TODO: password validation method in User model
        if (!user) { //|| !user.validatePassword(password)) {
          return done(null, false, { message: 'ユーザ名かパスワードが間違っています' })
        }
        return done(null, user);
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
          console.log(user);
          done(null, user);
        } else {
          done(null, false);
          //TODO: redirect to signup page
        }
      });
    }
  ));


  //TODO: rename this file to authenticator.js
  //TODO:
  //return authenticator;
  //authenticator = {
  // local: passport.authenticate('local'),
  // jwt: passport.authenticate('jwt'),
  //}
};
