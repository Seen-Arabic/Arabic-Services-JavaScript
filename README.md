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
<a href="https://www.npmjs.com/package/arabic-services"><img src="https://img.shields.io/npm/dt/arabic-services.svg" alt="npm version badge"></a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues">
<img src="https://img.shields.io/github/issues/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/network/members">
<img src="https://img.shields.io/github/forks/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/stargazers">
<img src="https://img.shields.io/github/stars/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/Seen-Arabic/Arabic-Services-JavaScript"/>
</a>
<a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/ci.yml">
<img src="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/ci.yml/badge.svg" alt="workflows">
</a>
</div>

## 📋 Features

- **Tashkeel Removal**: Easily remove Tashkeel from Arabic text.
- **Tatweel Removal**: Remove Tatweel character from Arabic phrases.
- **Convert To Old Arabic**: Transform Arabic text into old script.
- **Convert To Old Arabic And Tashfeer Banned Words**: Transform Arabic text into old script and replace Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media)
- **Tashfeer**: Replaces Arabic text with visually similar characters for encoding purposes.
- **Tashfeer Banned Words**: Replaces Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media)
- **Remove Arabic Affixes**: Removes predefined affixes (prefixes and suffixes) from an Arabic word if it starts or ends with those affixes.
- **Word To Letters**: Convert Arabic word to its pronounced letters.
- ... and more!

<h3 align=center><a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/wiki/Features-Documentation">➡️ Check out the usage and detailed documentation on each feature ⬅️</a></h3>

## 🚀 Getting Started

Arabic-Services was designed to work in both the browser and NodeJS applications.

### Browser

You can use the library directly in the browser via CDN using **jsdelivr** or **unpkg**, or download standalone bundle files from the latest [GitHub Releases](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases):

```html
<!-- Via jsdelivr (Recommended) -->
<script src="https://cdn.jsdelivr.net/npm/arabic-services@1/dist/umd/arabic-services.umd.js"></script>

<!-- Or via unpkg -->
<script src="https://unpkg.com/arabic-services@1/dist/umd/arabic-services.umd.js"></script>

<script>
	console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
	// Output: 'الخيل والليل والبيداء تعرفني'
</script>
```

### NodeJS & Modern Bundlers

Install the package via npm:

```bash
npm install arabic-services
```

#### ES Module & Tree Shaking (Recommended):

Import only the functions you need for maximum bundle size reduction:

```javascript
import { removeTashkeel, removeTatweel, toOldArabic } from 'arabic-services';

console.log(removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

Or import the full object:

```javascript
import { ArabicServices } from 'arabic-services';
```

#### CommonJS:

```javascript
const { removeTashkeel, ArabicServices } = require('arabic-services');
console.log(removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

## 💡 Contributing

Arabic Services is made publicly available to provide a well tested and well documented library for processing and transforming Arabic text to all developers. We accept feature contributions provided that they are properly documented and include the appropriate unit tests.

- 🚀 If you want to contribute to this project and make it better with new ideas, your pull request is very welcomed.
- 📝 If you find any issue just put it in the repository issue section, thank you.

## 🌟 Star this repository

Please ⭐️ this repo and share it with others

## 📜 License

This project is licensed under the GPL-3.0 License. See the [LICENSE](./LICENSE) file for more details.

## 💬 Contact

- 📩 Email: [SeenDevelopment@gmail.com](mailto:SeenDevelopment@gmail.com)
- 🌎 [Website](https://seen-arabic.github.io/)
