"use strict";

var webpack = require('webpack'),
	path = require('path'),
	nodeModulesPath = path.resolve(__dirname, 'node_modules'),
	buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
	devtool: 'eval',
	entry: {
		login: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			path.resolve(__dirname, 'app', 'main.js')
		],
	},
	output: {
		path: buildPath,
		filename: 'app.bundle.js',
		publicPath: '/build/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath] },
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      		{ test: /\.png$/, loader: "url-loader?limit=100000" },
      		{ test: /\.jpg$/, loader: "file-loader" },
      		{ test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
		    { test: /\.woff2$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
		    { test: /\.ttf$/, loader: "file-loader" },
		    { test: /\.eot$/, loader: "file-loader" },
		    { test: /\.svg$/, loader: "file-loader" }
      	]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
