module.exports = {
  entry: './',  
  output: {
  path: '../todos-react-heroku',
  filename: 'bundle.js'
  },
  devtool:  'inline-source-map',
  devServer: {
  	publicPath: '/',   
  	filename: 'bundle.js',  
  	host: '0.0.0.0',
  	port: 8087
  },
    module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs']
        }
      }
    ]
  }
}