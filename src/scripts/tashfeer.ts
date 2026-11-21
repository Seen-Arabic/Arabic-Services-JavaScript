import { BANNED_WORDS } from '../constants';
import {
	ALEF,
	ALONE_LETTERS,
	LETTERS_TASHFEER_REPLACEMENT_DICT,
	STANDARD_LETTERS,
	WAW,
	YAA,
} from '../constants/arabic-letters';
import { similarityScore } from '../utils';
import { removeArabicAffixesFromWord } from './affixes';
import { toOldArabic } from './old-arabic';

/**
 * Rejects invalid obfuscation levels before random-index generation.
 * @param {unknown} level - The input obfuscation level.
 */
function validateTashfeerLevel(level: unknown): void {
	if (typeof level !== 'number') {
		throw new TypeError('Level of tashfeer must be a number');
	}
	if (!Number.isFinite(level) || !Number.isInteger(level) || level < 0) {
		throw new RangeError('Level of tashfeer must be a non-negative finite integer');
	}
}

/**
 * Calculates the obfuscation level based on the input level and the length of the word.
 *
 * @param {number} level - The input obfuscation level.
 * @param {number} wordLength - The length of the word to be obfuscated.
 * @returns {number} The calculated obfuscation level.
 */
function calculateEncryptionLevel(level: number, wordLength: number): number {
	if (wordLength <= 0) {
		return 0;
	}
	// Check if the word length is less than or equal to 4
	if (wordLength <= 4) {
		// If so, return the minimum of (1 + level) and the word length
		return Math.min(1 + level, wordLength);
	} else if (wordLength < 8) {
		// If the word length is less than 8
		// Return the minimum of (2 + level) and the word length
		return Math.min(2 + level, wordLength);
	} else {
		// If the word length is 8 or greater
		// Return the minimum of (3 + level) and the word length
		return Math.min(3 + level, wordLength);
	}
}

/**
 * Generates a list of random indexes for obfuscation.
 * @param {number} numOfIndexesToNeeded - The number of random indexes to generate.
 * @param {number} wordLength - The length of the word.
 * @returns {number[]} An array of random indexes.
 */
function getRandomIndexes(numOfIndexesToNeeded: number, wordLength: number): number[] {
	if (wordLength <= 0 || numOfIndexesToNeeded <= 0) {
		return [];
	}

	const count = Math.min(numOfIndexesToNeeded, wordLength);
	// Create a Set to store unique random indexes
	const randomIndexes = new Set<number>();

	// Continue generating random indexes until the desired count is reached
	while (randomIndexes.size < count) {
		// Generate a random index within the word length
		randomIndexes.add(Math.floor(Math.random() * wordLength));
	}

	// Convert the Set to an array and sort the indexes
	return Array.from(randomIndexes).sort((a, b) => a - b);
}

/**
 * Processes the word for obfuscation using random indexes.
 * @param {string[]} chars - The characters of the word to be obfuscated.
 * @param {number[]} randomIndexes - The random indexes for obfuscation.
 * @returns {string} The obfuscated word.
 */
function tashfeerWord(chars: string[], randomIndexes: number[]): string {
	let outputWord = '';

	for (let i = 0; i < chars.length; i++) {
		// Check if the character is a standard Arabic letter and needs to be replaced
		// and ignore any other character such as Latin or digits
		// Also, check if the current index is in the list of random indexes for replacement
		if (STANDARD_LETTERS.includes(chars[i]) && randomIndexes.includes(i)) {
			// Get the replacement letter for the current character
			const letter = tashfeerCharacter(chars[i]);

			// Check if the previous character is a connecting standard Arabic letter.
			// This prevents inserting Tatweel after newlines, emojis, spaces, or non-connecting letters.
			const prevChar = i > 0 ? chars[i - 1] : '';
			if (STANDARD_LETTERS.includes(prevChar) && !ALONE_LETTERS.includes(prevChar)) {
				// Add a Maddah / Tatweel character for better readability
				outputWord += 'ـ';
			}

			// Add the replacement letter to the obfuscated word
			outputWord += letter;
		} else {
			// If the character doesn't need to be replaced, add it as it is
			outputWord += chars[i];
		}
	}

	return outputWord;
}

/**
 * Returns a randomly selected replacement character for the input character based on the tashfeer rules.
 * @param {string} character - The input character to be replaced.
 * @returns {string} The randomly selected replacement character.
 */
function tashfeerCharacter(character: string): string {
	if (ALEF.includes(character)) {
		character = 'ا';
	}
	if (WAW.includes(character)) {
		character = 'و';
	}
	if (YAA.includes(character)) {
		character = 'ي';
	}

	// Get the list of possible replacement characters for the input character
	const REPLACEMENT_CHAR_LIST = LETTERS_TASHFEER_REPLACEMENT_DICT[character];
	// Generate a random index to select a replacement character
	const randomIndex = Math.floor(Math.random() * REPLACEMENT_CHAR_LIST.length);
	// Get the randomly selected replacement character
	const replacementCharacter = REPLACEMENT_CHAR_LIST[randomIndex];
	return replacementCharacter;
}

/**
 * Performs tashfeer obfuscation on a given word.
 * @param {string} word - The input word to be obfuscated.
 * @param {number} [level=0] - The obfuscation level (default is 0).
 * @returns {string} The obfuscated word.
 */
function tashfeerHandler(word: string, level: number = 0): string {
	const chars = Array.from(word);
	const wordLength = chars.length;
	// Calculate the obfuscation level based on the input level and word length
	const n = calculateEncryptionLevel(level, wordLength);
	// Generate a list of random indexes for obfuscation
	const randomIndexes = getRandomIndexes(n, wordLength);
	// Process the word for obfuscation using random indexes
	const outputWord = tashfeerWord(chars, randomIndexes);
	return outputWord;
}

/**
 * Performs tashfeer obfuscation on a given sentence.
 * @param {string} sentence - The input sentence to be obfuscated.
 * @param {number} [levelOfTashfeer=1] - The obfuscation level.
 * @returns {string} The obfuscated sentence.
 */
export function tashfeer(sentence: string, levelOfTashfeer: number = 1): string {
	validateTashfeerLevel(levelOfTashfeer);
	sentence = sentence.trim();
	if (!sentence) {
		return '';
	}

	const tokens = sentence.split(/(\s+)/);
	let new_sentence = '';
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (i % 2 === 1) {
			new_sentence += token;
		} else if (token) {
			new_sentence += tashfeerHandler(token, levelOfTashfeer);
		}
	}
	return new_sentence;
}

/**
 * Calculates a ratio that likely represents the degree of similarity of a given string to elements in a 'banned' array.
 *
 * @param {string} string - The string to be compared against the elements in the 'banned' array.
 * @returns {number} The highest similarity ratio found between the string and elements in 'banned'.
 */
function bannedSimilarityRatio(string: string): number {
	let maximumSimilarity = -1;
	for (const i in BANNED_WORDS) {
		const calculatedSimilarity = similarityScore(string, BANNED_WORDS[i]);
		if (calculatedSimilarity > maximumSimilarity) {
			maximumSimilarity = calculatedSimilarity;
		}
	}
	return maximumSimilarity * 100;
}

/**
 * Checks if a string is similar to any 'banned' words based on a predefined similarity ratio.
 *
 * @param {string} string - The string to be checked.
 * @returns {boolean} True if the string is similar to any 'banned' word, false otherwise.
 */
function checkIfBannedWord(string: string): boolean {
	const std_ratio = 70;
	return BANNED_WORDS.includes(string) || bannedSimilarityRatio(removeArabicAffixesFromWord(string)) >= std_ratio;
}

/**
 * Performs tashfeer obfuscation on a given sentence, but only for words that are considered "banned" words.
 * Banned words are determined based on a predefined similarity ratio.
 *
 * @param {string} sentence - The input sentence to be obfuscated.
 * @param {number} [levelOfTashfeer=2] - The obfuscation level (default is 2).
 * @returns {string} The obfuscated sentence with tashfeer applied to banned words.
 */
export function tashfeerBannedWords(sentence: string, levelOfTashfeer: number = 2): string {
	validateTashfeerLevel(levelOfTashfeer);
	sentence = sentence.trim();
	if (!sentence) {
		return '';
	}

	const tokens = sentence.split(/(\s+)/);
	let new_sentence = '';
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (i % 2 === 1) {
			new_sentence += token;
		} else if (token) {
			if (checkIfBannedWord(token)) {
				new_sentence += tashfeerHandler(token, levelOfTashfeer);
			} else {
				new_sentence += token;
			}
		}
	}
	return new_sentence;
}

/**
 * Converts a sentence to old Arabic script and applies tashfeer to banned words.
 * @param {string} sentence - The input sentence.
 * @param {number} [levelOfTashfeer=2] - The obfuscation level (default is 2).
 * @returns {string} The processed sentence.
 */
export function toOldArabicAndTashfeerBannedWords(sentence: string, levelOfTashfeer: number = 2): string {
	validateTashfeerLevel(levelOfTashfeer);
	sentence = sentence.trim();
	if (!sentence) {
		return '';
	}

	const tokens = sentence.split(/(\s+)/);
	let new_sentence = '';
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (i % 2 === 1) {
			new_sentence += token;
		} else if (token) {
			if (checkIfBannedWord(token)) {
				new_sentence += tashfeerHandler(token, levelOfTashfeer);
			} else {
				new_sentence += toOldArabic(token);
			}
		}
	}
	return new_sentence;
}
