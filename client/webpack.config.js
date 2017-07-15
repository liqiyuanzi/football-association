var webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:{
    index:"./src/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "build"), 
    filename:'[name].js',
	chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude:/(node_modules)/,
		// 不包含的选项
		 loader: "babel-loader",
        options: {
			plugins:['transform-runtime'],
			presets: ["es2015","react",'stage-0']
        }
      },
	  {
        test: /\.less$/i,
		include: [
          path.resolve(__dirname, "src/styles")
        ],
        use: ExtractTextPlugin.extract({
          use:[ {
                loader: "css-loader" // translates CSS into CommonJS 
            }, {
                loader: "less-loader" // compiles Less to CSS 
            }, {
                loader: "postcss-loader", // compiles Less to CSS 
				options:{
					plugins: (loader) => [
						require('autoprefixer')() //postcss-loader配置参数
					]
				}
			}]
        })
      },
	  {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=1&name=images/[name].[ext]'
      }
    ]
  },
	plugins: [
		new ExtractTextPlugin({filename: 'styles.css',allChunks: true }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
			  warnings: false,
			  drop_console: false,
			}
		  }),
		 require('autoprefixer'),
		new webpack.DefinePlugin({
		  "process.env": { 
			 NODE_ENV: JSON.stringify("production") 
		   }
		}),//去除警告
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	devtool: "eval",// enum
	resolve:{
		extensions: [".js", ".jsx"],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules'),
			path.resolve('../node_modules')
		]
	}
}