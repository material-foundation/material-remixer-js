module.exports = {
  entry: {
    remixer: './src/core/Remixer.ts',
    overlay: './src/ui/render.tsx'
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: "ts-loader"
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader"
    }, {
      test: /\.html$/,
      loader: "html-loader"
    }],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  }
};
