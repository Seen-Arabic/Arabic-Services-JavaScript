import { TASHKEEL } from '../constants/index.js';

/**
 * Remove all tashkeel from text
 * @param text string to remove tashkeel from
 * @returns string without tashkeel
 * @example
 * ```js
 * removeTashkeel('الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني'); // 'الخيـل والليـل والبيـداء تعرفني'
 * ```
 */
export function removeTashkeel(text: string): string {
	let cleanText = text.trim();
	cleanText = cleanText.replace(new RegExp(`[${TASHKEEL.join('')}]`, 'g'), '');
	cleanText = cleanText.replace(/ٱ/g, 'ا');
	return cleanText;
}

/**
 * Remove all tatweel from text
 * @param text string to remove tatweel from
 * @returns string without tatweel
 * @example
 * ```js
 * removeTatweel('الخَيْـــلُ'); // 'الخَيْلُ'
 * ```
 */
export function removeTatweel(text: string): string {
	return text.trim().replace(/\u0640/g, '');
}
