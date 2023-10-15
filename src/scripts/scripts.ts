import { ARABIC_DOTLESS_DICT, TASHKEEL } from '../constants';

/**
 * Remove all tashkeel from text
 * @param text string to remove tashkeel from
 * @returns string without tashkeel
 * @example
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الخيل والليل والبيداء تعرفني"
 */
function removeTashkeel(text: string): string {
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
function toOldArabic(sentence: string): string {
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
function removeTatweel(text: string): string {
	return text.replace(/ـ/g, '');
}

export { removeTashkeel, removeTatweel, toOldArabic };
