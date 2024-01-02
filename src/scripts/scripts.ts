import { ARABIC_DOTLESS_DICT, BANNED_WORDS, TASHKEEL } from '../constants';
import {
	ALEF,
	ALONE_LETTERS,
	ARABIC_PREFIXES,
	ARABIC_SUFFIXES,
	LETTERS_TASHFEER_REPLACEMENT_DICT,
	PRONOUNCED_LETTERS,
	STANDARD_LETTERS,
	WAW,
	YAA,
} from '../constants/arabic-letters';
import { setCharAt, similarityScore } from '../utils';
import { fillDefaultOptions, type OldArabicOptions } from '../option';

/**
 * Remove all tashkeel from text
 * @param text string to remove tashkeel from
 * @returns string without tashkeel
 * @example
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الخيل والليل والبيداء تعرفني"
 */
export function removeTashkeel(text: string): string {
	return text
		.trim()
		.replace(new RegExp('[' + TASHKEEL.join('') + ']', 'g'), '')
		.replace(/ٱ/g, 'ا');
}

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
		} else {
			// letter is Arabic letter => replace it with its corresponding dotless letter
			newSentence += ARABIC_DOTLESS_DICT[sentence[letter]];
			// Handle 'ن' Issue
			if (replaceMidNoonWithBah && sentence[letter] == 'ن') {
				const nextLetter = letter + 1;
				// if 'ن' is not last character replace it with 'ب' corresponding dotless letter => 'ٮ'
				if (nextLetter < sentence.length) {
					let temp = newSentence.substring(0, newSentence.length - 1);
					if (ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[nextLetter]) || sentence[nextLetter] == 'ـ') {
						temp += ARABIC_DOTLESS_DICT['ب'];
						newSentence = temp;
					}
				}
			} else if (replaceMidYahWithBah && sentence[letter] == 'ي') {
				const nextLetter = letter + 1;
				// if 'ي' is not last character replace it with 'ب' corresponding dotless letter => 'ٮ'
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

export function toOldArabicAndTashfeerBannedWords(sentence: string, levelOfTashfeer: number = 2): string {
	let new_sentence = '';
	const words = sentence.trim().split(' ');
	for (const word of words) {
		if (checkIfBannedWord(word)) {
			new_sentence += tashfeerHandler(word, levelOfTashfeer) + ' ';
		} else {
			new_sentence += toOldArabic(word) + ' ';
		}
	}
	return new_sentence.trim();
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
	return text.trim().replace(/ـ/g, '');
}

/**
 * Converts a word to its pronounced letter representations based on PRONOUNCED_LETTERS.
 * @param {string} word - The word to convert.
 * @returns {string} The word with pronounced letters separated by spaces.
 */
export function wordToLetters(word: string): string {
	const trimmedWord = word.trim();
	let newWord = '';

	// Loop through each character in the input word
	for (let i = 0; i < trimmedWord.length; i++) {
		const letter = trimmedWord[i];

		// Check if the current letter has a pronunciation in PRONOUNCED_LETTERS
		if (PRONOUNCED_LETTERS.hasOwnProperty(letter)) {
			newWord += PRONOUNCED_LETTERS[letter];

			// Add a space after the pronounced letter unless it's the last letter in the word
			if (i !== trimmedWord.length - 1) {
				newWord += ' ';
			}
		} else {
			// If the letter is not in PRONOUNCED_LETTERS, keep it unchanged
			newWord += letter;
		}
	}

	return newWord.trim();
}

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
function tashfeerWord(word: string, randomIndexes: number[]): string {
	let outputWord = '';

	for (let i = 0; i < word.length; i++) {
		// Check if the character is a standard Arabic letter and needs to be replaced
		// and ignore any other character such as Latin or digits
		// Also, check if the current index is in the list of random indexes for replacement
		if (STANDARD_LETTERS.includes(word[i]) && randomIndexes.includes(i)) {
			// Get the replacement letter for the current character
			const letter = tashfeerCharacter(word[i]);

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
 * Performs tashfeer encryption on a given word.
 * @param {string} word - The input word to be encrypted.
 * @param {number} [level=0] - The encryption level (default is 0).
 * @returns {string} The encrypted word.
 */
function tashfeerHandler(word: string, level: number = 0): string {
	const wordLength = word.length;
	// Calculate the encryption level based on the input level and word length
	const n = calculateEncryptionLevel(level, wordLength);
	// Generate a list of random indexes for encryption
	const randomIndexes = getRandomIndexes(n, wordLength);
	// Process the word for encryption using random indexes
	const outputWord = tashfeerWord(word, randomIndexes);
	return outputWord;
}

/**
 * Performs tashfeer encryption on a given sentence.
 * @param {string} sentence - The input sentence to be encrypted.
 * @returns {string} The encrypted sentence.
 */
export function tashfeer(sentence: string, levelOfTashfeer: number = 1): string {
	sentence = sentence.trim();
	let new_sentence = '';
	for (const word of sentence.split(' ')) {
		new_sentence += tashfeerHandler(word, levelOfTashfeer) + ' ';
	}
	return new_sentence.trim();
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
	return bannedSimilarityRatio(removeArabicAffixes(string)) >= std_ratio;
}

/**
 * Performs tashfeer encryption on a given sentence, but only for words that are considered "banned" words.
 * Banned words are determined based on a predefined similarity ratio.
 *
 * @param {string} sentence - The input sentence to be encrypted.
 * @param {number} [levelOfTashfeer=2] - The encryption level (default is 2).
 * @returns {string} The encrypted sentence with tashfeer applied to banned words.
 */
export function tashfeerBannedWords(sentence: string, levelOfTashfeer: number = 2): string {
	let new_sentence = '';
	sentence = sentence.trim();
	for (const word of sentence.split(' ')) {
		if (checkIfBannedWord(word)) {
			new_sentence += tashfeerHandler(word, levelOfTashfeer) + ' ';
		} else {
			new_sentence += word + ' ';
		}
	}
	return new_sentence.trim();
}
