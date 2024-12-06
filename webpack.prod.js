const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
require("dotenv").config();
module.exports = merge(common, {
  mode: "production",
});
