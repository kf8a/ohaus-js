var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
// var pathToReact = path.resolve(node_modules, 'react/dist/react.js');
// var pathToD3 = path.resolve(node_modules, 'd3/d3.js');

module.exports = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
  // resolve: {
  //     alias: {
  //           'react': pathToReact,
  //           'd3': pathToD3
  //         }
  //   },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
      // noParse: [pathToReact, pathToD3],
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: node_modules
      }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }]
  }
};
