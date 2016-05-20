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
    // secretOrKey: fs.readFileSync('private.key'),
    options: {
      algorithm: 'HS256',
      expiresIn: '2 days',
      audience:  process.env.JWT_AUDIENCE,
      issuer:    process.env.JWT_ISSUER,
    },
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
