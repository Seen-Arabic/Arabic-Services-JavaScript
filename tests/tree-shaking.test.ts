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
});
