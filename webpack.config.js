const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/data.js",
    "./js/ajax.js",
    "./js/map.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/page.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
