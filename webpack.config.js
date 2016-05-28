var path    = require('path');
var webpack = require('webpack');
var cwd     = process.cwd();

module.exports = {
  entry: {
    'admin': './client/javascripts/admin/admin.jsx',
    'users': './client/javascripts/users/users.jsx',
    'users-authenticate': './client/javascripts/users/users-authenticate.jsx',
    'users-show': './client/javascripts/users/users-show.jsx',
    'posts': './client/javascripts/posts/posts.jsx',
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
    new webpack.optimize.UglifyJsPlugin()
  ]
};
