var path = require('path');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
	context: __dirname,
	entry  : {
		'order-form.mobile': './page/order-form.mobile',
	},

	output: {
		path: path.resolve(__dirname, '..', 'public/dist/bundle'),

		filename     : '[name].bundle.js',
		chunkFilename: '[id].chunk.js',

		library: 'Bundle'
	},

	module: {
		preLoaders: [
			{
				test   : /\.js$/,
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'external')
				],
				loader : 'eslint'
			}
		],
		loaders   : [
			{
				test  : /\.css$/,
				loader: 'style!css!postcss'
			},
			{
				test  : /\.scss$/,
				loader: 'style!css!postcss!sass'
			},
			{
				test  : /\.hbs$/,
				loader: 'handlebars'
			}
		]
	},

	externals: [
		{
			'underscore': 'var _',
			'jquery'    : 'var $'
		}
	],

	resolve: {
		modulesDirectories: [
			'node_modules',
			'external',

			'module',
			'component'
		],

		alias: {
		}
	},

	eslint: {
		formatter  : require('eslint-friendly-formatter'),
		failOnError: true
	},

	postcss: function (webpack) {
		return [
			require('postcss-import')({
				addDependencyTo: webpack
			}),
			require('autoprefixer')({
				browsers: [
					'> 5%'
				]
			})
		];
	}

	,devtool: '#inline-source-map',// 개발시 map 디버깅용, 배포시 삭제 필요

	plugins: [
		new UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})]
};
