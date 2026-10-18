import { ARABIC_DOTLESS_DICT } from '../constants/index.js';
import { fillDefaultOptions, OldArabicOptions } from '../options.js';
import { removeTashkeel } from './tashkeel.js';

/**
 * Remove all dots & tashkeel from text
 * @param sentence string to convert to old arabic
 * @param option
 * @returns string in old arabic
 * @example
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الحىل واللىل والٮىدا ٮعرڡٮى"
 */
export function toOldArabic(sentence: string, option: OldArabicOptions = {}): string {
	const { replaceMidNoonWithBah, replaceMidYahWithBah } = fillDefaultOptions(option);
	sentence = removeTashkeel(sentence.trim());
	let newSentence = '';
	for (let letter = 0; letter < sentence.length; letter++) {
		// if letter is not Arabic letter => append to newSentence
		if (!ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[letter])) {
			newSentence += sentence[letter];
		}
		// Handle 'ن' Issue:
		// if 'ن' is not last character && next character is Arabic letter or 'ـ'
		// then replace it with 'ب' corresponding dotless letter => 'ٮ'
		else if (
			replaceMidNoonWithBah &&
			sentence[letter] == 'ن' &&
			letter + 1 < sentence.length &&
			(ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[letter + 1]) || sentence[letter + 1] == 'ـ')
		) {
			newSentence += ARABIC_DOTLESS_DICT['ب'];
		}
		// Handle 'ي' Issue
		// if 'ي' is not last character && next character is Arabic letter or 'ـ'
		// then replace it with 'ب' corresponding dotless letter => 'ٮ'
		else if (
			replaceMidYahWithBah &&
			sentence[letter] == 'ي' &&
			letter + 1 < sentence.length &&
			(ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[letter + 1]) || sentence[letter + 1] == 'ـ')
		) {
			newSentence += ARABIC_DOTLESS_DICT['ب'];
		} else {
			// if letter is Arabic letter => append corresponding dotless letter to newSentence
			newSentence += ARABIC_DOTLESS_DICT[sentence[letter]];
		}
	}
	return newSentence;
}
