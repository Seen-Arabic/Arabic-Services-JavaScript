import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: { index: './src/index.ts' },
	format: 'esm',
	outDir: 'dist/esm',
	root: 'src',
	target: 'es2020',
	unbundle: true,
	sourcemap: true,
	dts: { sourcemap: true, tsconfig: 'tsconfig.esm.json' },
	fixedExtension: false,
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	exports: false,
});
