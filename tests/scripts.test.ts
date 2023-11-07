import { ArabicServices } from '../dist';

describe('#removeTashkeel()', () => {
	describe('Test with Poetry Text', () => {
		it('should remove all tashkeel from Poetry text', () => {
			const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
			const actual = ArabicServices.removeTashkeel(text);
			const expected = `الخيـل والليـل والبيـداء تعرفني والسيف والرمح والقرطاس والقلـم`;
			expect(actual).toBe(expected);
		});
	});

	describe('Test with Quran Text', () => {
		it('should remove all tashkeel from Quran text', () => {
			const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
			const actual = ArabicServices.removeTashkeel(text);
			const expected = `وقالوا الحمد لله الذي أذهب عنا الحزن إن ربنا لغفور شكور`;
			expect(actual).toBe(expected);
		});
	});
});

describe('#toOldArabic()', () => {
	describe('Test ن letter', () => {
		it('should convert ن to ں last letter, else convert it to ٮ', () => {
			const text = `ننن`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `ٮٮں`;
			expect(actual).toBe(expected);
		});
	});

	describe('Test Tatweel with ن letter', () => {
		it('should convert ن to ں last letter, else convert it to ٮ', () => {
			const text = `نــنــن`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `ٮــٮــں`;
			expect(actual).toBe(expected);
		});
	});

	describe('Test with Poetry Text', () => {
		it('should remove all dots & tashkeel from Poetry text', () => {
			const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `الحىـل واللىـل والٮىـدا ٮعرڡٮى والسىڡ والرمح والٯرطاس والٯلـم`;
			expect(actual).toBe(expected);
		});
	});

	describe('Test with Quran Text', () => {
		it('should remove tashkeel from Quran text', () => {
			const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
			const actual = ArabicServices.removeTashkeel(text);
			const expected = `وقالوا الحمد لله الذي أذهب عنا الحزن إن ربنا لغفور شكور`;
			expect(actual).toBe(expected);
		});
	});
});

describe('#removeTatweel()', () => {
	it("should remove all tatweel 'ـ' from text", () => {
		const text = 'رائـــــــع';
		const actual = ArabicServices.removeTatweel(text);
		const expected = 'رائع';
		expect(actual).toBe(expected);
	});
});

describe('#tashfeer', () => {
	it('should return a string with tashfeer-ed characters', () => {
		const inputWord = 'هذه الجملة مشفرة';
		const result = ArabicServices.tashfeer(inputWord);
		expect(result).toEqual(expect.any(String));
		expect(result).not.toEqual(inputWord);
	});
});
