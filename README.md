<div align=center>
	<a href="/README_AR.md">
		<img  src="https://user-images.githubusercontent.com/48678280/174657158-9bc1a1d3-8d9c-4162-8d5b-71cc5d4c1fc6.png">
	</a>
</div>

<h1 align=center>Arabic Services JavaScript</h1>

<p align=center>
بعض الخدمات البرمجية على نصوص اللغة العربية
<br>
A versatile library offering utility functions for processing and transforming Arabic text.
Can be used in Node.js and the browser.

</p>

<div align="center">
<a href="https://www.npmjs.com/package/arabic-services"><img src="https://img.shields.io/npm/v/arabic-services.svg" alt="npm version badge"></a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues">
<img src="https://img.shields.io/github/issues/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/network/members">
<img src="https://img.shields.io/github/forks/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/stargazers">
<img src="https://img.shields.io/github/stars/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/blob/master/LICENSE">
<img src="https://img.shields.io/github/license/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/test.yml">
<img src="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/test.yml/badge.svg" alt="workflows">
</a>
</div>

## 📋 Features

-   **Tashkeel Removal**: Easily remove Tashkeel from Arabic text.
-   **Tatweel Removal**: Remove Tatweel character from Arabic phrases.
-   **Convert To Old Arabic**: Transform Arabic text into old script.
-   **Convert To Old Arabic And Tashfeer Banned Words**: Transform Arabic text into old script and replace Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media)
-   **Tashfeer**: Replaces Arabic text with visually similar characters for encoding purposes.
-   **Tashfeer Banned Words**: Replaces Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media)
-   **Remove Arabic Affixes**: Removes predefined affixes (prefixes and suffixes) from an Arabic word if it starts or ends with those affixes.
-   **Word To Letters**: Convert Arabic word to its pronounced letters.

## ⬇️ Installation

Arabic-Services was designed to work in both the browser and NodeJS applications.

### Browser

We provide both ESM and UMD bundles for use in the browser.
You can find it with the latest release files.

```html
<script src="arabic-services.umd.js"></script>
<script>
	console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
	// Output: 'الخيل والليل والبيداء تعرفني'
</script>
```

### NodeJS

Both CommonJS and ES Module libraries are provided.

```bash
npm install arabic-services
```

**CommonJS:**

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

**ES Module:**

```javascript
import { ArabicServices } from 'arabic-services';
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

## 💻 Usage

### Tashkeel Removal

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

### Tatweel Removal

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTatweel('كن جميـــلا ترى الوجــود جميـــــلا'));
// Output: 'كن جميلا ترى الوجود جميلا'
```

### Convert To Old Arabic

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.toOldArabic('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الحىل واللىل والٮىدا ٮعرڡٮى'
```

### Convert To Old Arabic And Tashfeer Banned Words

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.toOldArabicAndTashfeerBannedWords('جيش العدو يقتل الأطفال'));
// Output: 'چـێـݭ !ڵعـݚۉ ی۪ـڨـټل الاطڡال'
```

### Tashfeer

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.tashfeer('هذا النص مشفر'));
// Output: 'هـۮו اڵـݔص مـݭفـݛ'
```

### Tashfeer Banned Words

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.tashfeerBannedWords('جيش العدو يقتل الأطفال'));
// Output: 'چـێـݭ !ڵعـݚۉ ی۪ـڨـټل الأطفال'
```

### Word To Letters

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.wordToLetters('شجرة'));
// Output: شين جيم راء تاء_مربوطة
```

### Remove Arabic Affixes

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeAffixes('المدرسة'));
// Output: مدرس
```

<br>

## 💡 Contributing

If you want to contribute to this project and make it better with new ideas, your pull request is very welcomed.
If you find any issue just put it in the repository issue section, thank you.

## 🌟 Star this repository

Please ⭐️ this repo and share it with others

## 📜 License

This project is licensed under the GPL-3.0 License. See the [LICENSE](./LICENSE) file for more details.

## 💬 Contact

-   📩 Email: [SeenDevelopment@gmail.com](mailto:SeenDevelopment@gmail.com)
-   🌎 [Website](https://seen-arabic.github.io/)
