'use strict';
var Middleware = require('./middleware');

//TODO: app.set('constants', {httpStatus});
var httpStatus = require('http-status')

//TODO: into constructor
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy   = require('passport-jwt').Strategy;
var ExtractJwt    = JwtStrategy.ExtractJwt;
var jwt           = require('jsonwebtoken');

/**
 * authenticator middleware
 */
module.exports = class Authenticator extends Middleware {
  constructor(app, passport) {
    super(app);
    this.passport = passport;

    /**
     * user authorize by (uid || email) and password
     * response header contains JWT
     * after this authentication, all API access must be performed with JWT
     */
    this.passport.use(new LocalStrategy(
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
      var jwtConfig = this.config.authentication.JWT;
      this.passport.use(new JwtStrategy(
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
              //TODO: redirect to signup page in client
            }
          });
        }
      ));

      // bind self to use 'this' in instance method
      this.local = this.local.bind(this);
      this.requireJWT = this.requireJWT.bind(this);
  } // end of constructor


  local(req, res, next) {
    var config    = this.config;
    var jwtConfig = config.authentication.JWT;

    //FIXME: too much logic in controller!
    this.passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.json(err);
      }

      if (!user) {
        return res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          status: httpStatus.UNAUTHORIZED,
          message: httpStatus[httpStatus.UNAUTHORIZED]
        });
      }

      //TODO: remove unneccesary value from user and add JWT optionals in Strategy
      jwt.sign(user.toJSON(), jwtConfig.secretOrKey, jwtConfig.options, function(err, token) {
        if (err) {
          return res
          .status(httpStatus.UNAUTHORIZED)
          .json({
            status: httpStatus.UNAUTHORIZED,
            message: httpStatus[httpStatus.UNAUTHORIZED]
          });
        }
        return res.json({
          status: httpStatus.OK,
          message: httpStatus[httpStatus.OK],
          JWT: token,
        });
      });
    })(req, res, next);
  }


  requireJWT(req, res, next) {
    this.passport.authenticate('jwt', { session: false })(req, res, next);
  }

  //TODO: passport OAuth, OpenID Connect
};
