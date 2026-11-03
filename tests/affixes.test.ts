import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	removeArabicAffixes,
	tashfeer,
	tashfeerBannedWords,
	toOldArabic,
	toOldArabicAndTashfeerBannedWords,
} from '../src';

describe('Short affix-removal results', () => {
	it.each([
		'نور',
		'بنت',
		'اليد',
		'الدم',
		'بيده',
		'الري',
		'الكي',
		'غزة',
		'حرية',
		'عزة',
		'بِنْت',
		'نـور',
		'نور🙂',
		'نabc',
		'ال12a',
		'ال🙂a',
		'ال𞸀ت',
	])('should retain the original %s when the complete result has fewer than three Arabic letters', (word) => {
		expect(removeArabicAffixes(word)).toBe(word);
	});

	it.each([
		['الكتاب', 'كتاب'],
		['كتابهم', 'كتاب'],
		['مدرسة', 'مدرس'],
		['ال𞸀بت', '𞸀بت'],
		['تفاح', 'فاح'],
		['فلسطين', 'فلسط'],
		['كالسيوم', 'كالسيوم'],
		['والدان', 'والدان'],
	])('should retain the existing result of %s when it has at least three Arabic letters', (word, expected) => {
		expect(removeArabicAffixes(word)).toBe(expected);
	});

	it('should guard each word without changing existing trimming or repeated spaces', () => {
		expect(removeArabicAffixes('  نور    الكتاب  بنت  ')).toBe('نور    كتاب  بنت');
	});

	it.each([
		['نور\nبنت', 'نور\nبنت'],
		['نور\tبنت', 'نور\tبنت'],
		['نور،بنت', 'نور،بنت'],
		['نور—بنت', 'نور—بنت'],
		['الكتاب،طلابهم', 'كتاب،طلاب'],
		['(الكتاب)', '(كتاب)'],
		['نور🙂كتابهم', 'نور🙂كتاب'],
		['  نور \t الكتاب\r\nبنت  ', 'نور \t كتاب\r\nبنت'],
	])('should process words independently and preserve separators in %j', (text, expected) => {
		expect(removeArabicAffixes(text)).toBe(expected);
	});
});

describe('Banned-word recognition compatibility', () => {
	afterEach(() => vi.restoreAllMocks());

	it.each([
		['فلسطين', true],
		['غزة', true],
		['حرية', true],
		['عزة', true],
		['كتابهم', true],
		['نور', false],
		['بنت', false],
		['جميلة', false],
	])('should preserve recognition of %s in both public obfuscation functions', (word, recognized) => {
		let seed = 1;
		vi.spyOn(Math, 'random').mockImplementation(() => {
			seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
			return seed / 4294967296;
		});
		const obfuscated = tashfeer(word);
		seed = 1;
		expect(tashfeerBannedWords(word, 1)).toBe(recognized ? obfuscated : word);
		seed = 1;
		expect(toOldArabicAndTashfeerBannedWords(word, 1)).toBe(recognized ? obfuscated : toOldArabic(word));
	});
});
