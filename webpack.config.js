var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
// var glob = require('glob');



module.exports = {
	entry: './dist/js/index.js',
	output:
	{
		path: './dist/js',
		filename: 'index.js'
	},
	module:
	{
		loaders:[
			{test:/\.html$/, loader:'html'}
		]
	},
	resolve: {
		extensions: ['', '.js', '.html']
	}
};
