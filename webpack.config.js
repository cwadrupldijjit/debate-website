var path = require('path');

// var pathToSassLodader

module.exports = {
	
	entry: "./public/css/styles.scss",
	
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	
	output: { 
		filename: 'styles.css'
	}
};