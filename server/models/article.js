'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    user_id: DataTypes.NUMBER,
    published: DataTypes.BOOL,
    year: DataTypes.NUMBER,
    month: DataTypes.NUMBER,
    day: DataTypes.NUMBER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Article;
};