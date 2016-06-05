'use strict';
module.exports = function(sequelize, DataTypes) {

  /**
   * make default slug from published_at in form of UNIX time
   * if no slug param is given
   */
  var defaultSlugHook = function(article, options, callback) {
    if (!article.get('slug') || article.get('slug') === '' ) {
      article.set('slug', (new Date().getTime()));
    }
    callback(null, options);
  };


  var Article = sequelize.define('article', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
    published_at: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9-]/,
        len: [1,32],
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [0,64],
      },
    },
    body_markdown: {
      type: DataTypes.TEXT,
    }
  }, {
    underscored: true,
    defaultScope: {
      where: { published: true },
      attributes: ['id', 'published_at', 'slug', 'title', 'body_markdown'],
    },
    scopes: {
      show: {
        where: { published: true },
        attributes: ['id', 'published_at', 'slug', 'title', 'body_markdown'],
      }
    },
    hooks: {
      beforeCreate: defaultSlugHook,
      beforeUpdate: defaultSlugHook,
    },
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.User, {
          onDelete: 'CASCADE',
        });
      }
    },
    instanceMethods: {
      publish: function() {
        this.set('published', true);
      },
      unpublish: function() {
        this.set('published', false);
      },
    },
  });
  return Article;
};
