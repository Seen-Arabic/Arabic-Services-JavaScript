// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = [
	{
		// Configuration for UMD bundle
		entry: './src/index.ts',
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			filename: 'arabic-services.umd.js',
			path: path.resolve(__dirname, 'dist'),
			library: 'ArabicServices',
			libraryTarget: 'umd',
			globalObject: 'this',
		},
	},
	{
		// Configuration for ESM bundle
		entry: './src/index.ts',
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			filename: 'arabic-services.esm.js',
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'module',
		},
		experiments: {
			outputModule: true,
		},
	},
];
