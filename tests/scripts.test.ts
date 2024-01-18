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
		it('should convert ن to ں in all case', () => {
			const text = `ننن`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidNoonWithBah: false });
			const expected = `ںںں`;
			const expectedUnicode = '\u06BA\u06BA\u06BA';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
	});

	describe('Test Tatweel with ن letter', () => {
		it('should convert ن to ں last letter, else convert it to ٮ', () => {
			const text = `نــنــن`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `ٮــٮــں`;
			expect(actual).toBe(expected);
		});
		it('should convert ن to ں last letter in all cases', () => {
			const text = `نــنــن`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidNoonWithBah: false });
			const expected = `ںــںــں`;
			const expectedUnicode = '\u06BA\u0640\u0640\u06BA\u0640\u0640\u06BA';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
	});

	describe('Test ي letter', () => {
		it('should convert ي to ى last letter, else convert it to ٮ', () => {
			const text = `ييي`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidYahWithBah : true });
			const expected = `ٮٮى`;
			const expectedUnicode = '\u066E\u066E\u0649';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
		it('should convert ي to ى in all case (default)', () => {
			const text = `ييي`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidNoonWithBah: false });
			const expected = `ىىى`;
			const expectedUnicode = '\u0649\u0649\u0649';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
	});

	describe('Test Tatweel with ي letter', () => {
		it('should convert ي to ى last letter, else convert it to ٮ', () => {
			const text = `يــيــي`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidYahWithBah : true });
			const expected = `ٮــٮــى`;
			const expectedUnicode = '\u066E\u0640\u0640\u066E\u0640\u0640\u0649';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
		it('should convert ي to ں last letter in all cases (default)', () => {
			const text = `يــيــي`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `ىــىــى`;
			const expectedUnicode = '\u0649\u0640\u0640\u0649\u0640\u0640\u0649';
			expect(actual).toBe(expected);
			expect(actual).toBe(expectedUnicode);
		});
	});

	describe('Test with Poetry Text', () => {
		it('should remove all dots & tashkeel from Poetry text', () => {
			const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `الحىـل واللىـل والٮىـدا ٮعرڡٮى والسىڡ والرمح والٯرطاس والٯلـم`;
			expect(actual).toBe(expected);
		});
		it('should remove all dots & tashkeel from Poetry text, with option replace Yeh with dotless Bah', () => {
			const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidYahWithBah: true });
			const expected = `الحٮـل واللٮـل والٮٮـدا ٮعرڡٮى والسٮڡ والرمح والٯرطاس والٯلـم`;
			expect(actual).toBe(expected);
		});
	});

	describe('Test with Quran Text', () => {
		it('should remove all dots & tashkeel from Quran text', () => {
			const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
			const actual = ArabicServices.toOldArabic(text);
			const expected = `وٯالوا الحمد لله الدى ادهٮ عٮا الحرں اں رٮٮا لعڡور سکور`;
			expect(actual).toBe(expected);
		});
		it('should remove all dots & tashkeel from Quran text', () => {
			const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
			const actual = ArabicServices.toOldArabic(text, { replaceMidNoonWithBah: false });
			const expected = `وٯالوا الحمد لله الدى ادهٮ عںا الحرں اں رٮںا لعڡور سکور`;
			expect(actual).toBe(expected);
		});
	});
});

describe('#toOldArabicAndTashfeerBannedWords()', () => {
	it('should perform tashfeer encryption on banned words only and convert the rest to old arabic script', () => {
		const sentence = 'جيش العدو يقتل الأطفال';
		const result = ArabicServices.toOldArabicAndTashfeerBannedWords(sentence);
		expect(result).not.toEqual(sentence);
		expect(result).toMatch(/الاطڡال/);
		expect(result).not.toMatch(/جيش/);
		expect(result).not.toMatch(/العدو/);
		expect(result).not.toMatch(/يقتل/);
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

describe('#wordToLetters', () => {
	it('should return a string with pronounced Arabic letters', () => {
		const inputWord = 'هذه جملة عربية';
		const result = ArabicServices.wordToLetters(inputWord);
		expect(result).toEqual(expect.any(String));
		expect(result).not.toEqual(inputWord);
	});

	it('should handle empty input', () => {
		const inputWord = '';
		const result = ArabicServices.wordToLetters(inputWord);
		expect(result).toEqual('');
	});

	it('should handle input with no pronounced Arabic letters', () => {
		const inputWord = '12345 not in Arabic letters';
		const result = ArabicServices.wordToLetters(inputWord);
		expect(result).toEqual(inputWord);
	});

	it('should handle input with spaces', () => {
		const inputWord = 'هذه جملة اخرى';
		const result = ArabicServices.wordToLetters(inputWord);
		expect(result).toEqual('هاء ذال هاء  جيم ميم لام تاء_مربوطة  ألف خاء راء ألف_لينة');
	});
});

describe('#removeArabicAffixes', () => {
	it('should remove "أ" prefix from a word', () => {
		const word = 'أمل';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('مل');
	});

	it('should remove "ا" prefix & suffix "ة" from a word', () => {
		const word = 'امرأة';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('مرأ');
	});

	it('should remove "إ" prefix from a word', () => {
		const word = 'إنسان';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('نسان');
	});

	it('should remove "ال" prefix from a word', () => {
		const word = 'الكتاب';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('كتاب');
	});

	it('should remove "ي" prefix from a word', () => {
		const word = 'يوم';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('وم');
	});

	it('should remove "ت" prefix from a word', () => {
		const word = 'تفاح';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('فاح');
	});

	it('should remove "ن" prefix from a word', () => {
		const word = 'نجم';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('جم');
	});

	it('should remove "ب" prefix from a word', () => {
		const word = 'بيت';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('يت');
	});

	it('should remove "ة" suffix from a word', () => {
		const word = 'كتابة';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('كتاب');
	});

	it('should remove "ه" suffix from a word', () => {
		const word = 'جديه';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('جدي');
	});

	it('should remove "ي" suffix from a word', () => {
		const word = 'ذهبي';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('ذهب');
	});

	it('should remove "ى" suffix from a word', () => {
		const word = 'منزلي';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('منزل');
	});

	it('should remove "ية" suffix from a word', () => {
		const word = 'علمية';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('علم');
	});

	it('should remove "ين" suffix from a word', () => {
		const word = 'موظفين';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('موظف');
	});

	it('should remove "ون" suffix from a word', () => {
		const word = 'موظفون';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('موظف');
	});

	it('should remove "هم" suffix from a word', () => {
		const word = 'طلابهم';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('طلاب');
	});

	it('should remove prefix & suffix from a sentence', () => {
		const word = 'المدرسون يحبون طلابهم';
		const result = ArabicServices.removeArabicAffixes(word);
		expect(result).toEqual('مدرس حب طلاب');
	});
});

describe('#similarityScore', () => {
	it('should return 1 for identical strings', () => {
		const s1 = 'مرحبا';
		const s2 = 'مرحبا';
		const result = ArabicServices.utils.similarityScore(s1, s2);
		expect(result).toEqual(1.0);
	});

	it('should return 0 for completely different strings', () => {
		const s1 = 'شجرة';
		const s2 = 'طفل';
		const result = ArabicServices.utils.similarityScore(s1, s2);
		expect(result).toEqual(0.0);
	});

	it('should return a value between 0 and 1 for similar strings', () => {
		const s1 = 'مرحبا';
		const s2 = 'مرحب';
		const result = ArabicServices.utils.similarityScore(s1, s2);
		expect(result).toBeGreaterThan(0.0);
		expect(result).toBeLessThan(1.0);
	});

	it('should handle empty strings', () => {
		const s1 = '';
		const s2 = '';
		const result = ArabicServices.utils.similarityScore(s1, s2);
		expect(result).toEqual(1.0);
	});

	it('should handle one empty string', () => {
		const s1 = 'مرحبا';
		const s2 = '';
		const result = ArabicServices.utils.similarityScore(s1, s2);
		expect(result).toEqual(0.0);
	});
});

describe('#tashfeerBannedWords', () => {
	it('should perform tashfeer encryption on banned words only', () => {
		const sentence = 'جيش العدو يقتل الأطفال';
		const result = ArabicServices.tashfeerBannedWords(sentence);
		expect(result).not.toEqual(sentence);
		expect(result).toMatch(/الأطفال/);
		expect(result).not.toMatch(/جيش/);
		expect(result).not.toMatch(/العدو/);
		expect(result).not.toMatch(/يقتل/);
	});

	it('should not perform tashfeer encryption on non-banned words', () => {
		const sentence = 'هذه جملة غير مشفرة';
		const result = ArabicServices.tashfeerBannedWords(sentence);
		expect(result).toEqual(sentence);
	});

	it('should handle empty input', () => {
		const sentence = '';
		const result = ArabicServices.tashfeerBannedWords(sentence);
		expect(result).toEqual('');
	});
});
