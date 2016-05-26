'use strict';

module.exports = class ApiUserController extends BaseController {
  constructor(app) {
    super(app);
    this.index = this.index.bind(this);
  }

  index(req, res) {
    this.models.User.findAll().then(function(users) {
      res.json({users});
    });
  }

  /**
   * authenticate and publish JWT
   */
  token(req, res, next) {
    var jwt = this.middlewares.jwt;
    var httpStatus = this.middlewares.httpStatus;
    var config    = this.config;
    var jwtConfig = config.authentication.JWT;
    var passport  = this.middlewares.passport;

    //FIXME: too much logic in controller!
    passport.authenticate('local', function(err, user, info) {
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
}
