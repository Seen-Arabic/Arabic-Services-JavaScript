module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
	env: {
		node: true,
		jest: true,
	},
};
