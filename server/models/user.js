'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  /**
   * for asyncronous hashing
   * use beforeCreate & beforeUpdate hooks
   */
  var hashPasswordHook = function(user, options, callback) {
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) {
        return callback(err);
      }

      user.set('password_hash', hash);
      return callback(null, options);
    });
  };

  /**
   * User model definition
   */
  var User = sequelize.define('User', {
    uid: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9][a-zA-Z0-9-]+$/,
        min: 5,
        max: 16,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        min: 8,
        max: 32,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 16,
      },
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    family_name: {
      type: DataTypes.STRING,
    },
    given_name: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    bio: {
      type: DataTypes.STRING,
      validate: {
        max: 1024,
      },
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  }, {
    defaultScope: {
      underscored: true,
      attributes: [
        'id',
        'uid',
        'name',
        'avatar',
        'family_name',
        'given_name',
        'bio',
        'url',
      ],
    },
    scopes: {
      authenticate: {
        attributes: ['uid', 'email', 'password_hash']
      }
    },
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook,
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      authenticate: function(password, callback) {
        bcrypt.compare(password, this.password_hash, function(err, isValid) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, isValid);
          }
        });
      },
    },
  });
  return User;
};
