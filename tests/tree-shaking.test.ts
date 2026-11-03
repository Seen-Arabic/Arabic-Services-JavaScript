import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as vm from 'node:vm';
import webpack from 'webpack';
import ArabicServicesDefault, {
	ArabicServices,
	removeTashkeel,
	removeTatweel,
	toOldArabic,
	TASHKEEL,
	setCharAt,
} from '../dist/esm/index.js';

describe('Tree Shaking & Named Exports', () => {
	it('should support direct named export of functions', () => {
		expect(typeof removeTashkeel).toBe('function');
		expect(typeof removeTatweel).toBe('function');
		expect(typeof toOldArabic).toBe('function');

		const text = 'الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني';
		expect(removeTashkeel(text)).toBe('الخيل والليل والبيداء تعرفني');
	});

	it('should support direct named export of constants and utilities', () => {
		expect(Array.isArray(TASHKEEL)).toBe(true);
		expect(typeof setCharAt).toBe('function');
	});

	it('should maintain full backward compatibility via ArabicServices object', () => {
		expect(typeof ArabicServices.removeTashkeel).toBe('function');
		expect(ArabicServices.removeTashkeel('مَرْحَبًا')).toBe('مرحبا');
	});

	it('should support default export', () => {
		expect(ArabicServicesDefault).toBeDefined();
		expect(typeof ArabicServicesDefault.removeTashkeel).toBe('function');
		expect(ArabicServicesDefault.removeTashkeel('مَرْحَبًا')).toBe('مرحبا');
	});

	it('should support native Node.js ESM import with named exports', () => {
		const stdout = execSync(
			"node --input-type=module -e \"import('./dist/esm/index.js').then(m => console.log(JSON.stringify({ hasRemoveTashkeel: typeof m.removeTashkeel, hasArabicServices: typeof m.ArabicServices, sampleResult: m.removeTashkeel('مَرْحَبًا') })))\"",
			{ encoding: 'utf8' },
		);
		const result = JSON.parse(stdout);
		expect(result.hasRemoveTashkeel).toBe('function');
		expect(result.hasArabicServices).toBe('object');
		expect(result.sampleResult).toBe('مرحبا');
	});

	it('should omit unused APIs when bundling a single named import', async () => {
		const tempDir = fs.mkdtempSync(path.join(path.resolve(__dirname, '..'), '.tree-shaking-'));
		const entryPoint = JSON.stringify('arabic-services');
		try {
			fs.writeFileSync(
				path.join(tempDir, 'single.mjs'),
				`import { removeTashkeel } from ${entryPoint}; globalThis.result = removeTashkeel('مَرْحَبًا');`,
			);
			fs.writeFileSync(
				path.join(tempDir, 'full.mjs'),
				`import { ArabicServices } from ${entryPoint}; globalThis.result = ArabicServices;`,
			);
			fs.writeFileSync(
				path.join(tempDir, 'affixes.mjs'),
				`import { removeArabicAffixes } from ${entryPoint}; globalThis.result = removeArabicAffixes('نور بنت الكتاب');`,
			);
			await new Promise<void>((resolve, reject) => {
				webpack(
					{
						mode: 'production',
						entry: {
							single: path.join(tempDir, 'single.mjs'),
							full: path.join(tempDir, 'full.mjs'),
							affixes: path.join(tempDir, 'affixes.mjs'),
						},
						output: { path: path.join(tempDir, 'output'), filename: '[name].js' },
						devtool: false,
					},
					(error, stats) => {
						if (error) reject(error);
						else if (!stats || stats.hasErrors())
							reject(new Error(stats?.toString({ all: false, errors: true })));
						else resolve();
					},
				);
			});
			const singleBundle = fs.readFileSync(path.join(tempDir, 'output/single.js'), 'utf8');
			const fullBundle = fs.readFileSync(path.join(tempDir, 'output/full.js'), 'utf8');
			const affixesBundle = fs.readFileSync(path.join(tempDir, 'output/affixes.js'), 'utf8');
			const singleContext = { result: undefined };
			const fullContext = { result: undefined };
			const affixesContext = { result: undefined };
			vm.runInNewContext(singleBundle, singleContext);
			vm.runInNewContext(fullBundle, fullContext);
			vm.runInNewContext(affixesBundle, affixesContext);
			expect(singleContext.result).toBe('مرحبا');
			expect(fullContext.result).toHaveProperty('tashfeerBannedWords', expect.any(Function));
			expect(singleBundle).not.toContain('tashfeerBannedWords');
			expect(affixesContext.result).toBe('نور بنت كتاب');
			expect(affixesBundle).not.toContain('tashfeerBannedWords');
			expect(affixesBundle).not.toContain('فلسطين');
			expect(fullContext.result).not.toHaveProperty('removeArabicAffixesFromWord');
			expect(Buffer.byteLength(singleBundle)).toBeLessThan(Buffer.byteLength(fullBundle) / 2);
			expect(Buffer.byteLength(affixesBundle)).toBeLessThan(Buffer.byteLength(fullBundle) / 2);
			console.info(
				`Minified consumer bundles: single=${Buffer.byteLength(singleBundle)} B, affixes=${Buffer.byteLength(affixesBundle)} B, full=${Buffer.byteLength(fullBundle)} B`,
			);
		} finally {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	}, 15_000);
});
