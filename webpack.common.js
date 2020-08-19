const path = require("path");
const minify = require("html-minifier").minify;
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const html_minify_options = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true
};

module.exports = {
  entry: {
    theme: "./src/index.js"
  },
  output: {
    filename: "static/js/[name].js",
    path: path.resolve(__dirname, "niftools_sphinx_theme")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/html/",
          to: ".",
          force: true,
          transform(content, path) {
            return minify(content.toString(), html_minify_options);
          }
        },
        {
          from: "./src/templates/**/*.html",
          to: "./templates/",
          force: true,
          toType: "dir",
          flatten: true,
          transform(content, path) {
            return minify(content.toString(), html_minify_options);
          }
        }
      ]
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
              outputPath: "static/fonts/",
              publicPath: "../fonts/"
            }
          }
        ]
      }
    ]
  }
};
