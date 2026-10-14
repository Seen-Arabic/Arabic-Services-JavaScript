import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as vm from 'node:vm';
import { describe, expect, it } from 'vitest';

describe('Package Artifacts & Module Integrity', () => {
	const rootDir = path.resolve(__dirname, '..');
	const packageJsonPath = path.join(rootDir, 'package.json');
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

	it('should have all entry point files existing on disk and non-empty', () => {
		const entryPoints = [
			{ field: 'main', path: packageJson.main },
			{ field: 'module', path: packageJson.module },
			{ field: 'types', path: packageJson.types },
			{ field: 'unpkg', path: packageJson.unpkg },
			{ field: 'jsdelivr', path: packageJson.jsdelivr },
			{ field: 'exports.import.default', path: packageJson.exports['.'].import.default },
			{ field: 'exports.import.types', path: packageJson.exports['.'].import.types },
			{ field: 'exports.require.default', path: packageJson.exports['.'].require.default },
			{ field: 'exports.require.types', path: packageJson.exports['.'].require.types },
		];

		for (const entry of entryPoints) {
			const absolutePath = path.resolve(rootDir, entry.path);
			expect(fs.existsSync(absolutePath), `File specified in ${entry.field} (${entry.path}) must exist`).toBe(
				true,
			);
			const stats = fs.statSync(absolutePath);
			expect(stats.size, `File specified in ${entry.field} (${entry.path}) must not be empty`).toBeGreaterThan(0);
		}
	});

	it('should have dist/esm/package.json declaring type: module and sideEffects: false', () => {
		const esmPkgPath = path.join(rootDir, 'dist/esm/package.json');
		expect(fs.existsSync(esmPkgPath)).toBe(true);
		const esmPkg = JSON.parse(fs.readFileSync(esmPkgPath, 'utf8'));
		expect(esmPkg.type).toBe('module');
		expect(esmPkg.sideEffects).toBe(false);
	});

	it('should support standalone CommonJS require() in isolated Node.js process', () => {
		const script = `
			const { removeTashkeel, toOldArabic, ArabicServices } = require('./dist');
			const res1 = removeTashkeel('مَرْحَبًا');
			const res2 = ArabicServices.removeTatweel('رائـــــع');
			console.log(JSON.stringify({ res1, res2, hasToOldArabic: typeof toOldArabic === 'function' }));
		`;
		const stdout = execSync(`node -e "${script.replace(/\n/g, ' ')}"`, {
			cwd: rootDir,
			encoding: 'utf8',
		});
		const result = JSON.parse(stdout.trim());
		expect(result.res1).toBe('مرحبا');
		expect(result.res2).toBe('رائع');
		expect(result.hasToOldArabic).toBe(true);
	});

	it('should support standalone ES Module import in isolated Node.js process', () => {
		const script = `
			import { removeTashkeel, toOldArabic, ArabicServices } from './dist/esm/index.js';
			const res1 = removeTashkeel('مَرْحَبًا');
			const res2 = ArabicServices.removeTatweel('رائـــــع');
			console.log(JSON.stringify({ res1, res2, hasToOldArabic: typeof toOldArabic === 'function' }));
		`;
		const stdout = execSync(`node --input-type=module -e "${script.replace(/\n/g, ' ')}"`, {
			cwd: rootDir,
			encoding: 'utf8',
		});
		const result = JSON.parse(stdout.trim());
		expect(result.res1).toBe('مرحبا');
		expect(result.res2).toBe('رائع');
		expect(result.hasToOldArabic).toBe(true);
	});

	it('should execute browser UMD bundle inside a simulated browser window context', () => {
		const umdPath = path.join(rootDir, packageJson.unpkg);
		const umdCode = fs.readFileSync(umdPath, 'utf8');

		const sandbox: { window: Record<string, unknown>; ArabicServices?: Record<string, unknown> } = {
			window: {},
		};
		// Establish circular reference standard in browser environments (window.window === window)
		sandbox.window.window = sandbox.window;

		const context = vm.createContext(sandbox);
		vm.runInContext(umdCode, context);

		const arabicServices = (sandbox.window.ArabicServices || sandbox.ArabicServices) as Record<
			string,
			(...args: unknown[]) => unknown
		>;

		expect(arabicServices).toBeDefined();
		expect(typeof arabicServices.removeTashkeel).toBe('function');
		expect(typeof arabicServices.toOldArabic).toBe('function');
		expect(typeof arabicServices.removeTatweel).toBe('function');
		expect(typeof arabicServices.tashfeer).toBe('function');

		expect(arabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ')).toBe('الخيل والليل');
		expect(arabicServices.removeTatweel('كتــــاب')).toBe('كتاب');
	});

	it('should support in-process CommonJS loading via Node.js createRequire()', () => {
		const nodeRequire = createRequire(import.meta.url);
		const cjsDist = nodeRequire('../dist');

		expect(cjsDist).toBeDefined();
		expect(typeof cjsDist.removeTashkeel).toBe('function');
		expect(typeof cjsDist.toOldArabic).toBe('function');
		expect(typeof cjsDist.ArabicServices).toBe('object');
		expect(cjsDist.removeTashkeel('مَرْحَبًا')).toBe('مرحبا');
		expect(cjsDist.ArabicServices.removeTatweel('رائـــــع')).toBe('رائع');
	});

	it('should execute purely as Isomorphic/Universal functions without DOM dependencies', async () => {
		// Import all scripts in current process (where window and document are undefined)
		expect(typeof window).toBe('undefined');
		expect(typeof document).toBe('undefined');

		const dist = await import('../dist');
		expect(dist.removeTashkeel('فَحَصَ')).toBe('فحص');
		expect(dist.removeTatweel('مـلـف')).toBe('ملف');
		expect(dist.toOldArabic('بَيْت')).toBe('ٮىٮ');
	});
});
