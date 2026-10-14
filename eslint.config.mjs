import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	...tseslint.configs.recommended,
	prettierRecommended,
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
		},
	},
	{
		ignores: ['dist/**', 'coverage/**', 'node_modules/**', '*.config.*'],
	}
);
