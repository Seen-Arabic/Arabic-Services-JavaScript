const { ARABIC_DOTLESS_DICT, TASHKEEL } = require('./constants');

/**
 * Remove all tashkeel from text.
 *
 * e.g.
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الخيل والليل والبيداء تعرفني"
 */
function removeTashkeel(text) {
	return text
		.replace(new RegExp("[" + TASHKEEL.join() + "]", "g"), "")
		.replace(/ٱ/g, "ا");
}

/**
 * Remove all dots & tashkeel from text.
 *
 * e.g.
 *   Input: "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني"
 *   Output: "الحىل واللىل والٮىدا ٮعرڡٮى"
 */
function toOldArabic(sentence) {
	sentence = removeTashkeel(sentence);
	let newSentence = "";
	for (let letter = 0; letter < sentence.length; letter++) {
		// if letter is not Arabic letter => append to newSentence
		if (!ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[letter])) {
			newSentence += sentence[letter];
		} else {
			// letter is Arabic letter => replace it with its corresponding dotless letter
			newSentence += ARABIC_DOTLESS_DICT[sentence[letter]];
			// Handle 'ن' Issue
			if (sentence[letter] == "ن") {
				const nextLetter = letter + 1;
				// if 'ن' is not last character replace it with 'ب' corresponding dotless letter => 'ٮ'
				if (nextLetter < sentence.length) {
					let temp = newSentence.substring(0, newSentence.length - 1);
					if (
						ARABIC_DOTLESS_DICT.hasOwnProperty(sentence[nextLetter]) ||
						sentence[nextLetter] == "ـ"
					) {
						temp += ARABIC_DOTLESS_DICT["ب"];
						newSentence = temp;
					}
				}
			}
		}
	}
	return newSentence;
}

/**
 * Remove all tatweel from text.
 *
 * e.g.
 *   Input: "رائـــــــع"
 *   Output: "رائع"
 */
function removeTatweel(text) {
	return text.replace(/ـ/g, "");
}

module.exports = {
	removeTatweel,
	removeTashkeel,
	toOldArabic,
};
