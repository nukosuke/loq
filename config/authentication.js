'use strict';

/**
 * authentication
 * configuration
 */
module.exports = {
  'JWT': { //= Json Web Token (https://tools.ietf.org/html/rfc7519)
    jwtFromRequest: require('passport-jwt').ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret',
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },
};
