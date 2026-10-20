/**
 * Options for configuring affix removal.
 */
export interface AffixOptions {
	/**
	 * Minimum length of the remaining stem after affix removal.
	 * Words shorter than or equal to this length will not have affixes removed.
	 * @default 3
	 */
	minStemLength?: number;
	/**
	 * Whether to remove common Arabic prefixes (e.g. "ال", "بال", "ولل", "و").
	 * @default true
	 */
	prefixes?: boolean;
	/**
	 * Whether to remove common Arabic suffixes (e.g. "ون", "ين", "ات", "هم", "ة").
	 * @default true
	 */
	suffixes?: boolean;
}

const COMPOUND_PREFIXES = ['كال', 'بال', 'فال', 'وال', 'ولل', 'فلل'];
const DEFINITE_PREFIXES = ['ال', 'لل'];
const CONJUNCTION_PREFIXES = ['و'];

const LONG_SUFFIXES = ['تما', 'هما', 'كما'];
const MEDIUM_SUFFIXES = ['هم', 'هن', 'كم', 'كن', 'نا', 'ها', 'ون', 'ين', 'ات', 'ية'];
const SHORT_SUFFIXES = ['ة', 'ه', 'ي', 'ى'];

/**
 * Removes a matching prefix from a word if the remaining stem length satisfies minStemLength.
 */
function removePrefix(word: string, minStemLength: number): string {
	for (const p of COMPOUND_PREFIXES) {
		if (word.startsWith(p) && word.length - p.length >= minStemLength) {
			return word.slice(p.length);
		}
	}
	for (const p of DEFINITE_PREFIXES) {
		if (word.startsWith(p) && word.length - p.length >= minStemLength) {
			return word.slice(p.length);
		}
	}
	for (const p of CONJUNCTION_PREFIXES) {
		if (word.startsWith(p) && word.length - p.length >= minStemLength) {
			return word.slice(p.length);
		}
	}
	return word;
}

/**
 * Removes a matching suffix from a word if the remaining stem length satisfies minStemLength.
 */
function removeSuffix(word: string, minStemLength: number): string {
	for (const s of LONG_SUFFIXES) {
		if (word.endsWith(s) && word.length - s.length >= minStemLength) {
			return word.slice(0, -s.length);
		}
	}
	for (const s of MEDIUM_SUFFIXES) {
		if (word.endsWith(s) && word.length - s.length >= minStemLength) {
			return word.slice(0, -s.length);
		}
	}
	for (const s of SHORT_SUFFIXES) {
		if (word.endsWith(s) && word.length - s.length >= minStemLength) {
			return word.slice(0, -s.length);
		}
	}
	return word;
}

/**
 * Removes predefined affixes (prefixes and suffixes) from an Arabic word while
 * preserving a minimum stem length to prevent corrupting root letters.
 *
 * @param {string} word - The Arabic word from which affixes are to be removed.
 * @param {AffixOptions} [options] - Configuration options for affix removal.
 * @returns {string} The word after removing matching affixes.
 */
function removeArabicAffixesFromWord(word: string, options: AffixOptions = {}): string {
	const minStemLength = options.minStemLength ?? 3;
	const stripPrefixes = options.prefixes ?? true;
	const stripSuffixes = options.suffixes ?? true;

	word = word.trim();
	if (word.length <= minStemLength) {
		return word;
	}

	if (stripPrefixes) {
		word = removePrefix(word, minStemLength);
	}
	if (stripSuffixes) {
		word = removeSuffix(word, minStemLength);
	}
	return word;
}

/**
 * Removes predefined affixes (prefixes and suffixes) from words in an Arabic text while
 * preserving minimum stem length to protect root consonants.
 *
 * @param {string} text - The Arabic text from which affixes are to be removed.
 * @param {AffixOptions} [options] - Configuration options for affix removal.
 * @returns {string} The text after removing matching affixes from each word.
 *
 * @example
 * ```typescript
 * removeArabicAffixes('المدرسون يخلصون لطلابهم');
 * // returns 'مدرس يخلص طلاب'
 * ```
 */
export function removeArabicAffixes(text: string, options: AffixOptions = {}): string {
	if (!text || typeof text !== 'string') {
		return '';
	}
	text = text.trim();
	if (text.length === 0) {
		return '';
	}
	const words = text.split(' ');
	const processedWords: string[] = [];
	for (const word of words) {
		if (word === '') {
			processedWords.push('');
		} else {
			processedWords.push(removeArabicAffixesFromWord(word, options));
		}
	}
	return processedWords.join(' ');
}
