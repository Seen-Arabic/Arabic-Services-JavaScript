import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(...tseslint.configs.recommended, prettierRecommended, {
	ignores: ['dist/**', 'coverage/**', 'node_modules/**', '.tree-shaking-*/**', '*.config.*'],
});
