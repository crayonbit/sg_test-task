const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
  devServer: {
      contentBase: './dist',
      publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
        ]
      }
    ]
  },
  resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
      //new CopyWebpackPlugin([{from:'src/resources/images', to:'images'}]), 
  ]
};