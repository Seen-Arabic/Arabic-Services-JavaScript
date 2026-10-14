import { describe, it, expect } from 'vitest';
import {
	removeTashkeel,
	removeTatweel,
	toOldArabic,
	toOldArabicAndTashfeerBannedWords,
	tashfeer,
	tashfeerBannedWords,
	wordToLetters,
	removeArabicAffixes,
	BANNED_WORDS,
} from '../src';

describe('Arabic NLP Edge Cases & Robustness', () => {
	describe('Empty, Whitespace & Boundary Inputs', () => {
		it('should gracefully handle empty strings across all functions', () => {
			expect(removeTashkeel('')).toBe('');
			expect(removeTatweel('')).toBe('');
			expect(toOldArabic('')).toBe('');
			expect(toOldArabicAndTashfeerBannedWords('')).toBe('');
			expect(tashfeer('')).toBe('');
			expect(tashfeerBannedWords('')).toBe('');
			expect(wordToLetters('')).toBe('');
			expect(removeArabicAffixes('')).toBe('');
		});

		it('should trim surrounding whitespace properly', () => {
			expect(removeTashkeel('   مَرْحَبًا   ')).toBe('مرحبا');
			expect(removeTatweel('   رائــــع   ')).toBe('رائع');
			expect(toOldArabic('   كِتَابٌ   ')).toBe('کٮاٮ');
			expect(wordToLetters('   حب   ')).toBe('حاء باء');
		});

		it('should handle words that are shorter than standard affix length', () => {
			// 'و' is not in ARABIC_PREFIXES so it stays unchanged
			expect(removeArabicAffixes('و')).toBe('و');
			// 'ال' is an exact 2-letter prefix and is removed completely
			expect(removeArabicAffixes('ال')).toBe('');
			// single letter prefix 'ي'
			expect(removeArabicAffixes('يقرأ')).toBe('قرأ');
		});

		it('should handle sentences with irregular spacing', () => {
			const sentence = 'ذهب    الموظفون    إلى   العمل';
			const res = removeArabicAffixes(sentence);
			expect(res).toContain('موظف');
			expect(res).toContain('عمل');
		});
	});

	describe('Mixed Scripts & Special Characters Preservation', () => {
		it('should preserve Latin characters, numbers, and emojis while stripping Tashkeel', () => {
			const text = '🎉 Hello 123! الخَيْلُ وَاللّيْلُ (Test 456) ✨';
			const result = removeTashkeel(text);
			expect(result).toBe('🎉 Hello 123! الخيل والليل (Test 456) ✨');
		});

		it('should preserve non-Arabic characters in toOldArabic', () => {
			const text = 'User123: كَتَبَ email@example.com!';
			const result = toOldArabic(text);
			expect(result).toBe('User123: کٮٮ email@example.com!');
		});

		it('should preserve non-Arabic characters in tashfeer without corruption', () => {
			const text = 'Code 99: سلاح';
			const result = tashfeer(text);
			expect(result.startsWith('Code 99:')).toBe(true);
			expect(result.length).toBeGreaterThanOrEqual(text.length);
		});
	});

	describe('Complex Diacritics & Orthography', () => {
		it('should normalize Wasla Alef (ٱ) to standard Alef', () => {
			expect(removeTashkeel('ٱسْمُ')).toBe('اسم');
		});

		it('should remove stacked diacritics (Shaddah with Fatha/Kasra/Damma/Tanween)', () => {
			const stacked = 'مُحَمَّدٌ وَعَلِيٌّ';
			expect(removeTashkeel(stacked)).toBe('محمد وعلي');
		});

		it('should handle consecutive Tatweel characters cleanly', () => {
			const excessiveTatweel = 'قـــــــــــــــــال';
			expect(removeTatweel(excessiveTatweel)).toBe('قال');
		});

		it('should handle Tatweel combined with Tashkeel', () => {
			const tatweelWithTashkeel = 'رَائـِـــــعٌ';
			const noTashkeel = removeTashkeel(tatweelWithTashkeel);
			const clean = removeTatweel(noTashkeel);
			expect(clean).toBe('رائع');
		});
	});

	describe('Tashfeer Variants and Word Length Boundaries', () => {
		it('should handle Tashfeer on words with length >= 8 characters', () => {
			const longWord = 'المسؤوليات';
			const result = tashfeer(longWord, 1);
			expect(result).toBeDefined();
			expect(typeof result).toBe('string');
			expect(result.length).toBeGreaterThan(0);
		});

		it('should handle Tashfeer with Alef, Waw, and Yaa variants', () => {
			const sentence = 'أحمد يؤمن بالرئيس';
			const result = tashfeer(sentence, 2);
			expect(result).toBeDefined();
			expect(result.length).toBeGreaterThan(0);
		});

		it('should obfuscate banned words using tashfeerBannedWords', () => {
			const text = 'هذا السلاح ممنوع';
			const result = tashfeerBannedWords(text);
			expect(result).not.toBe(text);
			expect(result).toContain('هذا');
			expect(result).toContain('ممنوع');
		});

		it('should handle toOldArabicAndTashfeerBannedWords on mixed sentences', () => {
			const input = 'جيش العدو يقتل الأطفال';
			const result = toOldArabicAndTashfeerBannedWords(input, 1);
			expect(result).toBeDefined();
			expect(result.split(' ').length).toBeGreaterThanOrEqual(4);
		});
	});

	describe('Performance & ReDoS Resilience', () => {
		it('should process large texts (50,000+ chars) in under 150ms without catastrophic backtracking', () => {
			const sampleUnit = 'الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني، وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ! ';
			const largeText = sampleUnit.repeat(600); // ~54,000 characters
			expect(largeText.length).toBeGreaterThan(50000);

			const startTashkeel = performance.now();
			const noTashkeel = removeTashkeel(largeText);
			const tashkeelDuration = performance.now() - startTashkeel;

			const startTatweel = performance.now();
			const noTatweel = removeTatweel(largeText);
			const tatweelDuration = performance.now() - startTatweel;

			const startOldArabic = performance.now();
			const oldArabic = toOldArabic(largeText);
			const oldArabicDuration = performance.now() - startOldArabic;

			expect(noTashkeel.length).toBeLessThan(largeText.length);
			expect(noTatweel.length).toBeLessThan(largeText.length);
			expect(oldArabic.length).toBeGreaterThan(0);

			expect(tashkeelDuration, 'removeTashkeel should process large text within 150ms').toBeLessThan(150);
			expect(tatweelDuration, 'removeTatweel should process large text within 150ms').toBeLessThan(150);
			expect(oldArabicDuration, 'toOldArabic should process large text within 150ms').toBeLessThan(150);
		});
	});
});
