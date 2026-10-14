import ArabicServicesDefault, {
	ArabicServices,
	removeTashkeel,
	removeTatweel,
	toOldArabic,
	TASHKEEL,
	setCharAt,
} from '../dist';

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
		const { execSync } = require('child_process');
		const stdout = execSync(
			'node --input-type=module -e "import(\'./dist/esm/index.js\').then(m => console.log(JSON.stringify({ hasRemoveTashkeel: typeof m.removeTashkeel, hasArabicServices: typeof m.ArabicServices, sampleResult: m.removeTashkeel(\'مَرْحَبًا\') })))"',
			{ encoding: 'utf8' }
		);
		const result = JSON.parse(stdout);
		expect(result.hasRemoveTashkeel).toBe('function');
		expect(result.hasArabicServices).toBe('object');
		expect(result.sampleResult).toBe('مرحبا');
	});
});
