module.exports = {
  entry: {
    remixer: './src/core/Remixer.ts',
    overlay: './src/ui/DOMController.tsx'
  },

  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  devtool: "source-map",

  resolve: {
    extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.less$/, loader: "style!css!less" }
    ],
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  }
};
