const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: 'js/theme.js',
    path: path.resolve(__dirname, 'niftools_sphinx_theme/static')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/theme.css',
    }),
  ],
  node: { Buffer: false },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: require.resolve('./src/theme.js'),
        use: 'imports-loader?this=>window'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
};