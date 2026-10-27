import { execFileSync, execSync } from 'node:child_process';
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
			const { removeTashkeel, toOldArabic, ArabicServices } = require('arabic-services');
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
			import { removeTashkeel, toOldArabic, ArabicServices } from 'arabic-services';
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
		expect(arabicServices.removeArabicAffixes('نور بنت الكتاب')).toBe('نور بنت كتاب');
		expect(arabicServices).not.toHaveProperty('removeArabicAffixesFromWord');
	});

	it('should load unrelated APIs without Unicode property escapes and defer that requirement to affix removal', () => {
		class LimitedRegExp extends RegExp {
			constructor(pattern: string | RegExp, flags?: string) {
				if (typeof pattern === 'string' && pattern.includes('\\p{')) {
					throw new SyntaxError('Unicode property escapes are unavailable');
				}
				super(pattern, flags);
			}
		}
		const sandbox: {
			window: Record<string, unknown>;
			RegExp: typeof LimitedRegExp;
			ArabicServices?: Record<string, (text: string) => string>;
		} = { window: {}, RegExp: LimitedRegExp };
		vm.runInNewContext(fs.readFileSync(path.join(rootDir, packageJson.unpkg), 'utf8'), sandbox);
		const api = (sandbox.window.ArabicServices || sandbox.ArabicServices) as Record<
			string,
			(text: string) => string
		>;
		expect(api.removeTashkeel('مَرْحَبًا')).toBe('مرحبا');
		expect(api.tashfeerBannedWords('نور')).toBe('نور');
		expect(() => api.removeArabicAffixes('نور')).toThrow('Unicode property escapes are unavailable');
	});

	it('should support in-process CommonJS loading via Node.js createRequire()', () => {
		const nodeRequire = createRequire(import.meta.url);
		const cjsDist = nodeRequire('arabic-services');

		expect(cjsDist).toBeDefined();
		expect(typeof cjsDist.removeTashkeel).toBe('function');
		expect(typeof cjsDist.toOldArabic).toBe('function');
		expect(typeof cjsDist.ArabicServices).toBe('object');
		expect(cjsDist.removeTashkeel('مَرْحَبًا')).toBe('مرحبا');
		expect(cjsDist.ArabicServices.removeTatweel('رائـــــع')).toBe('رائع');
		expect(cjsDist.removeArabicAffixes('نور بنت الكتاب')).toBe('نور بنت كتاب');
		expect(cjsDist).not.toHaveProperty('removeArabicAffixesFromWord');
	});

	it('should execute purely as Isomorphic/Universal functions without DOM dependencies', async () => {
		// Import all scripts in current process (where window and document are undefined)
		expect(typeof window).toBe('undefined');
		expect(typeof document).toBe('undefined');

		const dist = await import('arabic-services');
		expect(dist.removeTashkeel('فَحَصَ')).toBe('فحص');
		expect(dist.removeTatweel('مـلـف')).toBe('ملف');
		expect(dist.toOldArabic('بَيْت')).toBe('ٮىٮ');
	});

	it('should package entry points and source maps with resolvable original sources', () => {
		const npmCli = process.env.npm_execpath;
		if (!npmCli) throw new Error('Run package checks through npm run test:artifacts');
		const [pack] = JSON.parse(
			execFileSync(process.execPath, [npmCli, 'pack', '--dry-run', '--ignore-scripts', '--json'], {
				cwd: rootDir,
				encoding: 'utf8',
				timeout: 10_000,
			}),
		) as [{ files: { path: string }[] }];
		const files = new Set(pack.files.map((file) => file.path));
		for (const entry of [packageJson.main, packageJson.module, packageJson.types, packageJson.unpkg]) {
			expect(files.has(entry.replace(/^\.\//, '')), `Packaged entry point: ${entry}`).toBe(true);
		}
		expect([...files].some((file) => /^(tests|coverage|\.github)\//.test(file))).toBe(false);
		for (const source of fs.readdirSync(path.join(rootDir, 'src'), { recursive: true })) {
			if (typeof source === 'string' && source.endsWith('.ts')) {
				expect(files.has(`src/${source.replaceAll(path.sep, '/')}`), `Packaged source: ${source}`).toBe(true);
			}
		}

		for (const file of files) {
			if (!file.startsWith('dist/') || (!file.endsWith('.js') && !file.endsWith('.d.ts'))) continue;
			const output = fs.readFileSync(path.join(rootDir, file), 'utf8');
			const mapName = output.match(/\/\/# sourceMappingURL=(.+)/)?.[1].trim();
			if (!mapName) throw new Error(`Missing source map reference: ${file}`);
			const mapPath = path.posix.join(path.posix.dirname(file), mapName);
			expect(files.has(mapPath), `Packaged map: ${mapPath}`).toBe(true);
			const map = JSON.parse(fs.readFileSync(path.join(rootDir, mapPath), 'utf8')) as {
				version: number;
				file: string;
				sourceRoot?: string;
				sources: string[];
				sourcesContent?: (string | null)[];
				mappings: string;
			};
			expect(map.version).toBe(3);
			expect(map.mappings.length, `Mappings: ${mapPath}`).toBeGreaterThan(0);
			expect(path.posix.join(path.posix.dirname(mapPath), map.file)).toBe(file);
			expect(map.sources.length, `Original sources: ${mapPath}`).toBeGreaterThan(0);
			map.sources.forEach((source, index) => {
				if (typeof map.sourcesContent?.[index] === 'string') return;
				const sourcePath = path.posix.join(path.posix.dirname(mapPath), map.sourceRoot ?? '', source);
				expect(files.has(sourcePath), `Original source for ${mapPath}: ${sourcePath}`).toBe(true);
			});
		}
	}, 15_000);
});
