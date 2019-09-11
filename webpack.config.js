const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    theme: "./src/index.js"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "niftools_sphinx_theme/static")
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  node: { Buffer: false },
  externals: {
    jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]",
              outputPath: "fonts/",
              publicPath: "../fonts/"
            }
          }
        ]
      }
    ]
  }
};
