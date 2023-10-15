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
-   **Tatweel Removal**: Remove unnecessary Tatweel characters from Arabic phrases.
-   **Convert To Old Arabic**: Transform Arabic text into old script.

## ⬇️ Installation

Arabic-Services was designed to work in both the browser and NodeJS applications.

## Browser

We provide both ESM and UMD bundles for use in the browser.
Download the latest release and check under package/lib/bundles.

```html
<script src="arabic-services.umd.js"></script>
<script>
	console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
	// Output: 'الخيل والليل والبيداء تعرفني'
</script>
```

## NodeJS

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
