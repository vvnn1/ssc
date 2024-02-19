const PerspectivePlugin = require("@finos/perspective-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { override, addWebpackPlugin } = require("customize-cra");
module.exports = override(
    addWebpackPlugin(new PerspectivePlugin()),
    addWebpackPlugin(
        new MonacoWebpackPlugin({
            languages: ["mysql"],
        })
    ),
    addWebpackPlugin(
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
        })
    )
);
