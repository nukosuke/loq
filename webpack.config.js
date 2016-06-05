var path    = require('path');
var webpack = require('webpack');
var cwd     = process.cwd();

module.exports = {
  entry: {
    'constants': './client/javascripts/constants.js',
    'admin': './client/javascripts/admin/admin.jsx',
    'users': './client/javascripts/users.jsx',
    'users-authenticate': './client/javascripts/users-authenticate.jsx',
    'users-show': './client/javascripts/users-show.jsx',
    'articles': './client/javascripts/articles.jsx',
  },
  output: {
    path: path.join(__dirname, 'public/assets/javascripts'),
    publicPath: 'public/assets/javascripts',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    root: [
      path.join(__dirname, 'client/javascripts'),
      path.join(__dirname, 'client/stylesheets'),
    ],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'css' },
      { test: /\.scss$/, loader: 'scss' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]
};
