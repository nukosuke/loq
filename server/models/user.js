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
  var User = sequelize.define('user', {
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
      validate: {
        max: 16,
      },
    },
    given_name: {
      type: DataTypes.STRING,
      validate: {
        max: 16,
      },
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
    underscored: true,
    paranoid: true,
    defaultScope: {
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
        attributes: ['id', 'uid', 'email', 'password_hash']
      }
    },
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook,
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Article);
        //User.belongsTo(models.Organization);
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
