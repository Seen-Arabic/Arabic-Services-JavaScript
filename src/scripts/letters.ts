import { PRONOUNCED_LETTERS } from '../constants/index.js';

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
