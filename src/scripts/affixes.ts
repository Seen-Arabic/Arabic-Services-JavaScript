import { ARABIC_PREFIXES, ARABIC_SUFFIXES } from '../constants/arabic-letters.js';
import { setCharAt } from '../utils/string.util.js';

/** Legacy word stripping, retained independently for banned-word recognition. */
export function removeArabicAffixesFromWord(word: string): string {
	word = word.trim();
	if (ARABIC_PREFIXES.includes(word.substring(0, 2))) {
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
 * Removes listed affixes from each word, retaining its original form if the complete
 * stripped result has fewer than three Arabic-script letters. Diacritics, tatweel,
 * digits and other scripts do not count toward that minimum. This is a heuristic,
 * not morphological analysis; legitimate two-letter stems are also retained in full.
 * Words are letter/mark/number sequences; interior whitespace, punctuation and
 * symbols are preserved. Unicode property escapes are required when this is called.
 *
 * @param {string} text - The Arabic text from which the affixes are to be removed.
 * @returns {string} The text after removing any matching affixes from each word. Returns the original text trimmed if no affix matches are found.
 */
export function removeArabicAffixes(text: string): string {
	const wordPattern = new RegExp('[\\p{L}\\p{M}\\p{N}]+', 'gu');
	const arabicLetterPattern = new RegExp('(?=\\p{Script=Arabic})\\p{Letter}', 'gu');
	return text.trim().replace(wordPattern, (word) => {
		const stripped = removeArabicAffixesFromWord(word);
		arabicLetterPattern.lastIndex = 0;
		for (let count = 0; count < 3; count++) {
			if (!arabicLetterPattern.exec(stripped)) return word;
		}
		return stripped;
	});
}
