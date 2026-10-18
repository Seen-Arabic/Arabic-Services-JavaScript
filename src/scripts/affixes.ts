import { ARABIC_PREFIXES, ARABIC_SUFFIXES } from '../constants/index.js';
import { setCharAt } from '../utils/index.js';

/**
 * Removes predefined affixes (prefixes and suffixes) from an Arabic word if it starts or ends with those affixes.
 * This function is designed specifically for processing Arabic text, where certain affixes might need to be removed
 * for linguistic, stylistic, or morphological reasons.
 *
 * @param {string} word - The Arabic word from which the affixes are to be removed.
 * @returns {string} The word after removing any matching affixes. Returns the original word trimmed if no affix matches are found.
 */
function removeArabicAffixesFromWord(word: string): string {
	word = word.trim();
	if (ARABIC_PREFIXES.includes(word.substring(0, 2))) {
		// For: ALEF & LAM
		word = setCharAt(word, 0, '');
		word = setCharAt(word, 0, '');
	} else if (ARABIC_PREFIXES.includes(word.substring(0, 1))) {
		word = setCharAt(word, 0, '');
	}

	if (ARABIC_SUFFIXES.includes(word.substring(word.length - 2))) {
		word = setCharAt(word, word.length - 1, '');
		word = setCharAt(word, word.length - 1, '');
	} else if (ARABIC_SUFFIXES.includes(word[word.length - 1])) {
		word = setCharAt(word, word.length - 1, '');
	}

	return word;
}

/**
 * Removes predefined affixes (prefixes and suffixes) from an Arabic text if words start or end with those affixes.
 * This function is designed specifically for processing Arabic text, where certain affixes might need to be removed
 * for linguistic, stylistic, or morphological reasons.
 *
 * @param {string} text - The Arabic text from which the affixes are to be removed.
 * @returns {string} The text after removing any matching affixes from each word. Returns the original text trimmed if no affix matches are found.
 */
export function removeArabicAffixes(text: string): string {
	let new_sentence = '';
	text = text.trim();
	for (const word of text.split(' ')) {
		new_sentence += removeArabicAffixesFromWord(word) + ' ';
	}
	return new_sentence.trim();
}
