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
			path: path.resolve(__dirname, 'dist/umd'),
			library: 'ArabicServices',
			libraryTarget: 'umd',
			globalObject: 'this',
			libraryExport: 'ArabicServices',
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
			path: path.resolve(__dirname, 'dist/esm'),
			libraryTarget: 'module',
			libraryExport: 'ArabicServices',
		},
		experiments: {
			outputModule: true,
		},
	},
];
