var path = require('path');

// var pathToSassLodader

module.exports = {
	entry: [
		path.resolve
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};