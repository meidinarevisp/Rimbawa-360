const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
    login: path.resolve(__dirname, "src/scripts/login.js"),
    register: path.resolve(__dirname, "src/scripts/register.js"),
    direktori: path.resolve(__dirname, "src/scripts/direktori.js"),
    tentang: path.resolve(__dirname, "src/scripts/tentang.js"),
    detailDirektori: path.resolve(__dirname, "src/scripts/detail-direktori.js"),
    edukasi: path.resolve(__dirname, "src/scripts/edukasi.js"),
    spesies: path.resolve(__dirname, "src/scripts/spesies.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: path.resolve(__dirname, "src/templates/login.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "register.html",
      template: path.resolve(__dirname, "src/templates/register.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "direktori.html",
      template: path.resolve(__dirname, "src/templates/direktori.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "detail-direktori.html",
      template: path.resolve(__dirname, "src/templates/detail-direktori.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "tentang.html",
      template: path.resolve(__dirname, "src/templates/tentang.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "edukasi.html",
      template: path.resolve(__dirname, "src/templates/edukasi.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "spesies.html",
      template: path.resolve(__dirname, "src/templates/spesies.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
  ],
};
