'use strict';

/**
 * authentication
 * configuration
 */
module.exports.development =
module.exports.production  = {
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
   * Identity Providers
   */
   providers: {
     /**
      * NO support for OAuth 1.x
      * Use 2.0 instead.
      */
     oauth: {
       twitter: {
       },
       /* and more providers
       facebook: {
       },
       google: {
       },
       github: {
       },
       */
     },

     openid: {
       /**
        * NO support for OpenID Authentication 2.0 which has been deprecated.
        * Use OpenID Connect instead.
        */
       connect: {

       },
     },
  }

};
