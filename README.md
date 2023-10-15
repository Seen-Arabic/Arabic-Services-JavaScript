<h1 align=center>Arabic Services JavaScript</h1>

<p align=center>
بعض الخدمات البرمجية على نصوص اللغة العربية
<br>
A versatile library offering utility functions for processing and transforming Arabic text.
Can be used in Node.js and the browser.

</p>

<div align="center">
<img src="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/test.yml/badge.svg" alt="workflows">
<a href="https://www.npmjs.com/package/arabic-services"><img src="https://img.shields.io/npm/v/arabic-services.svg" alt="npm version badge"></a>
</div>

## 📋 Features

-   **Tashkeel Removal**: Easily remove Tashkeel from Arabic text.
-   **Tatweel Removal**: Remove unnecessary Tatweel characters from Arabic phrases.
-   **Convert To Old Arabic**: Transform Arabic text into old script.

## ⬇️ Installation

```bash
npm install arabic-services
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

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](./LICENSE) file for more details.

## Contact

-   📩 Email: [SeenDevelopment@gmail.com](mailto:SeenDevelopment@gmail.com)
-   🌎 [Website](https://seen-arabic.github.io/)
