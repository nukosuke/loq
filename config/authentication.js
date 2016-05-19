'use strict';

/**
 * authentication
 * configuration
 */
module.exports = {
  /**
   * Json Web Token
   * https://tools.ietf.org/html/rfc7519
   */
  JWT: {
    jwtFromRequest: require('passport-jwt').ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret',
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },

  /**
   * OAuth providers
   */
   providers: {
     twitter: {
       //TODO:
     },
     facebook: {
       //TODO:
     },
     /* and additional providers
     github: {

     },
     */
  }

};
