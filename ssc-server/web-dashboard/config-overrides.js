const PerspectivePlugin = require("@finos/perspective-webpack-plugin");
const { override,addWebpackPlugin } = require('customize-cra');

module.exports = override(
    addWebpackPlugin(new PerspectivePlugin())
);