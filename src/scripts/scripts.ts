import { ARABIC_DOTLESS_DICT, TASHKEEL } from '../constants';
import {
	ALEF,
	ALONE_LETTERS,
	LETTERS_TASHFEER_REPLACEMENT_DICT,
	STANDARD_LETTERS,
	WAW,
	YAA,
} from '../constants/arabic-letters';

/**
 * Remove all tashkeel from text
 * @param text string to remove tashkeel from
 * @returns string without tashkeel
 * @example
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الخيل والليل والبيداء تعرفني"
 */
export function removeTashkeel(text: string): string {
	return text.replace(new RegExp('[' + TASHKEEL.join('') + ']', 'g'), '').replace(/ٱ/g, 'ا');
}

/**
 * Remove all dots & tashkeel from text
 * @param sentence string to convert to old arabic
 * @returns string in old arabic
 * @example
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الحىل واللىل والٮىدا ٮعرڡٮى"
 */
export function toOldArabic(sentence: string): string {
	sentence = removeTashkeel(sentence);
	let newSentence = '';
	for (let letter = 0; letter < sentence.length; letter++) {
		// if letter is not Arabic letter => append to newSentence
		if (!ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[letter])) {
			newSentence += sentence[letter];
		} else {
			// letter is Arabic letter => replace it with its corresponding dotless letter
			newSentence += ARABIC_DOTLESS_DICT[sentence[letter]];
			// Handle 'ن' Issue
			if (sentence[letter] == 'ن') {
				const nextLetter = letter + 1;
				// if 'ن' is not last character replace it with 'ب' corresponding dotless letter => 'ٮ'
				if (nextLetter < sentence.length) {
					let temp = newSentence.substring(0, newSentence.length - 1);
					if (ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[nextLetter]) || sentence[nextLetter] == 'ـ') {
						temp += ARABIC_DOTLESS_DICT['ب'];
						newSentence = temp;
					}
				}
			}
		}
	}
	return newSentence;
}

/**
 * Remove all tatweel from text
 * @param text string to remove tatweel from
 * @returns string without tatweel
 * @example
 *   Input: "رائـــــــع"
 *   Output: "رائع"
 */
export function removeTatweel(text: string): string {
	return text.replace(/ـ/g, '');
}

/**
 * Performs tashfeer encryption on a given word.
 * @param {string} word - The input word to be encrypted.
 * @param {number} [level=0] - The encryption level (default is 0).
 * @returns {string} The encrypted word.
 */
export function tashfeer(word: string, level: number = 0): string {
	const wordLength = word.length;
	// Calculate the encryption level based on the input level and word length
	const n = calculateEncryptionLevel(level, wordLength);
	// Generate a list of random indexes for encryption
	const randomIndexes = getRandomIndexes(n, wordLength);
	// Process the word for encryption using random indexes
	const outputWord = encryptWord(word, randomIndexes);
	return outputWord;
}

/**
 * Calculates the encryption level based on the input level and word length.
 * @param {number} level - The input encryption level.
 * @param {number} wordLength - The length of the word to be encrypted.
 * @returns {number} The calculated encryption level.
 */
function calculateEncryptionLevel(level: number, wordLength: number): number {
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
 * Generates a list of random indexes for encryption.
 * @param {number} numOfIndexesToNeeded - The number of random indexes to generate.
 * @param {number} wordLength - The length of the word.
 * @returns {number[]} An array of random indexes.
 */
function getRandomIndexes(numOfIndexesToNeeded: number, wordLength: number): number[] {
	// Create a Set to store unique random indexes
	const randomIndexes = new Set<number>();

	// Continue generating random indexes until the desired number is reached
	while (randomIndexes.size !== numOfIndexesToNeeded) {
		// Generate a random index within the word length
		randomIndexes.add(Math.floor(Math.random() * wordLength));
	}

	// Convert the Set to an array and sort the indexes
	return Array.from(randomIndexes).sort((a, b) => a - b);
}

/**
 * Processes the word for encryption using random indexes.
 * @param {string} word - The word to be encrypted.
 * @param {number[]} randomIndexes - The random indexes for encryption.
 * @returns {string} The encrypted word.
 */
function encryptWord(word: string, randomIndexes: number[]): string {
	let outputWord = '';

	for (let i = 0; i < word.length; i++) {
		// Check if the character is a standard Arabic letter and needs to be replaced
		// and ignore any other character such as Latin or digits
		// Also, check if the current index is in the list of random indexes for replacement
		if (STANDARD_LETTERS.includes(word[i]) && randomIndexes.includes(i)) {
			// Get the replacement letter for the current character
			const letter = encryptCharacter(word[i]);

			// Check if the previous character is not an "alone" letter
			if (i !== 0 && !ALONE_LETTERS.includes(word[i - 1])) {
				// Add a Maddah character for better readability
				outputWord += 'ـ';
			}

			// Add the replacement letter to the encrypted word
			outputWord += letter;
		} else {
			// If the character doesn't need to be replaced, add it as it is
			outputWord += word[i];
		}
	}

	return outputWord;
}

/**
 * Returns a randomly selected replacement character for the input character based on the tashfeer rules.
 * @param {string} character - The input character to be replaced.
 * @returns {string} The randomly selected replacement character.
 */
function encryptCharacter(character: string): string {
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
 * Performs tashfeer encryption on a given sentence.
 * @param {string} sentence - The input sentence to be encrypted.
 * @returns {string} The encrypted sentence.
 */
export function tashfeerSentence(sentence: string): string {
	let new_sentence = '';
	for (const i of sentence.split(' ')) {
		const level = 1;
		new_sentence += tashfeer(i, level) + ' ';
	}
	return new_sentence.trim();
}
