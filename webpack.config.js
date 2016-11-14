module.exports = {
  entry: './',  
  output: {
  path: '../justdoit-heroku',
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
      },
      { test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url-loader?limit=1000000' 
      }
    ]
  }
}