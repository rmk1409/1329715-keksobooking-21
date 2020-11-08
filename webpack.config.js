const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/ajax.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/form.js",
    "./js/data.js",
    "./js/page.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
