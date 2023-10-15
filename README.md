<h1 align=center>Arabic-Services-JavaScript</h1>

<p align=center>
بعض الخدمات البرمجية على نصوص اللغة العربية
</p>

<p align=center>
<a href="https://www.npmjs.com/package/arabic-service-npm-test"><img src="https://img.shields.io/npm/v/arabic-service-npm-test.svg" alt="npm"></a> <img src="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/actions/workflows/test.yml/badge.svg" alt="workflows">
</p>

📋 Features currently supported:

# Tashkeel Removal

```javascript
const ArabicServices = require('arabic-services');
ArabicService.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني');
```

Output:

```
'الخيل والليل والبيداء تعرفني'
```

# Tatweel Removal

```javascript
const ArabicServices = require('arabic-services');
ArabicService.removeTatweel('كن جميـــلا ترى الوجــود جميـــــلا');
```

Output:

```
'كن جميلا ترى الوجود جميلا'
```

# Convert To Old Arabic

```javascript
const ArabicServices = require('arabic-services');
ArabicService.toOldArabic('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني');
```

Output:

```
'الحىل واللىل والٮىدا ٮعرڡٮى'
```
