var path    = require('path');
var webpack = require('webpack');
var cwd     = process.cwd();

module.exports = {
  entry: {
    'application': './client/javascripts/Application.jsx',
    'constants': './client/javascripts/constants.js',
    'admin': './client/javascripts/admin/admin.jsx',
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
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'scss'] },
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
