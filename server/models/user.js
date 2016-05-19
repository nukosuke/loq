'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    uid: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9][a-zA-Z0-9-]+$/,
        min: 5,
        max: 16,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      },
    },
    password_hash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function(value) {
        this.setDataValue('password', value);
        this.setDataValue('password_hash', this.salt + value)
      },
      validate: {
        min: 8,
        max: 32,
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
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
    family_name: DataTypes.STRING,
    given_name: DataTypes.STRING,
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
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
