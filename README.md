<h1 align=center>arabic-service-js</h1>

<p align=center>
بعض الخدمات البرمجية على نصوص اللغة العربية
</p>

<p align=center>
<a href="https://www.npmjs.com/package/arabic-service-npm-test"><img src="https://img.shields.io/npm/v/arabic-service-npm-test.svg" alt="npm"></a>
</p>


📋 Features currently supported:

# Tashkeel Removal

```javascript
const ArabicService = require('arabic-service');
ArabicService.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني');
```

Output:
```
'الخيل والليل والبيداء تعرفني'
```

# Tatweel Removal

```javascript
const ArabicService = require('arabic-service');
ArabicService.removeTatweel('كن جميـــلا ترى الوجــود جميـــــلا');
```

Output:
```
'كن جميلا ترى الوجود جميلا'
```

# Convert To Old Arabic

```javascript
const ArabicService = require('arabic-service');
ArabicService.toOldArabic('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني');
```

Output:
```
'الحىل واللىل والٮىدا ٮعرڡٮى'
```
