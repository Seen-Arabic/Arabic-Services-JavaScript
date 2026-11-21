import { PRONOUNCED_LETTERS } from '../constants';

/**
 * Converts a word to its pronounced letter representations based on PRONOUNCED_LETTERS.
 * @param {string} word - The word to convert.
 * @returns {string} The word with pronounced letters separated by spaces.
 */
export function wordToLetters(word: string): string {
	const trimmedWord = word.trim();
	const chars = Array.from(trimmedWord);
	let newWord = '';

	// Loop through each character in the input word
	for (let i = 0; i < chars.length; i++) {
		const letter = chars[i];

		// Check if the current letter has a pronunciation in PRONOUNCED_LETTERS
		if (Object.prototype.hasOwnProperty.call(PRONOUNCED_LETTERS, letter)) {
			newWord += PRONOUNCED_LETTERS[letter];

			// Add a space after the pronounced letter unless it's the last letter in the word
			if (i !== chars.length - 1) {
				newWord += ' ';
			}
		} else if (/\s/.test(letter)) {
			// Normalize multiple whitespace characters between words
			if (!newWord.endsWith('  ')) {
				newWord += ' ';
			}
			while (i + 1 < chars.length && /\s/.test(chars[i + 1])) {
				i++;
			}
		} else {
			// If the letter is not in PRONOUNCED_LETTERS, keep it unchanged
			newWord += letter;
		}
	}

	return newWord.trim();
}
