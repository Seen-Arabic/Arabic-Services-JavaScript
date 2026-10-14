import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.ts'],
		},
		alias: {
			'../dist': path.resolve(import.meta.dirname, './src'),
		},
	},
});
