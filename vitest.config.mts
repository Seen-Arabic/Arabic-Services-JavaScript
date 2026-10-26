import { defineConfig } from 'vitest/config';

const artifactTests = ['tests/artifacts.test.ts', 'tests/tree-shaking.test.ts'];

export default defineConfig(({ mode }) => ({
	test: {
		globals: true,
		environment: 'node',
		include: mode === 'artifacts' ? artifactTests : ['tests/**/*.test.ts'],
		exclude: mode === 'artifacts' ? [] : artifactTests,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.ts'],
		},
	},
}));
