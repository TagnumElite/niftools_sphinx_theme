const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const JSTerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new JSTerserPlugin(), new OptimizeCssAssetsPlugin({})]
  }
});
