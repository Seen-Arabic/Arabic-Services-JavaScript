<div align=center>
  <a href="/README.md">
    <img src="https://user-images.githubusercontent.com/48678280/174651387-5b23ab0a-792f-421b-a5bc-73f74e8f36b5.png">
  </a>
</div>


<h1 align=center>خدمات اللغة العربية بلغة جافا سكريبت</h1>

<p align=center>
  مكتبة متنوعة تقدم وظائف مساعدة لمعالجة وتحويل النصوص العربية.
يمكن استخدامها في Node.js والمتصفح.
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

## 📋 الميزات
-   **إزالة التشكيل:** إزالة التشكيل من النص العربي.
-   **إزالة التطويل:** إزالة أحرف التطويل غير الضرورية من العبارات العربية.
-   **التحويل إلى العربية القديمة:** تحويل النص العربي إلى الخط العربي القديم.
-   **التحويل إلى العربية القديمة وتشفير الكلمات المحظورة:** تحويل النص العربي إلى الخط العربي القديم واستبدال النصوص العربية المحظورة بأحرف مشابهة بصريًا لأغراض الترميز. (الكلمات المحظورة هي الكلمات التي تعتبر كلمات مسيئة في وسائل التواصل الاجتماعي)
-   **التشفير:** استبدال النص العربي بأحرف مشابهة بصريًا لأغراض الترميز.
-   **تشفير الكلمات المحظورة:** استبدال النصوص العربية المحظورة بأحرف مشابهة بصريًا لأغراض الترميز. (الكلمات المحظورة هي الكلمات التي تعتبر كلمات مسيئة في وسائل التواصل الاجتماعي)
-   **إزالة اللواحق العربية:** إزالة اللواحق المحددة (البادئات واللاحقات) من كلمة عربية إذا بدأت أو انتهت بهذه اللواحق.
-   **الكلمة إلى حروفها:** تحويل الكلمة العربية إلى حروفها المنطوقة.

## ⬇️ التثبيت

تم تصميم خدمات العربية لتعمل في كل من المتصفح وتطبيقات NodeJS.

### المتصفح

نوفر حزم ESM و UMD للاستخدام في المتصفح. يمكن العثور عليها مع ملفات الإصدار الأخير.

```html
<script src="arabic-services.umd.js"></script>
<script>
	console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
	// Output: 'الخيل والليل والبيداء تعرفني'
</script>
```

### NodeJS

تم توفير مكتبات CommonJS و ES Module.

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

## 💻 الاستخدام
### إزالة التشكيل

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الخيل والليل والبيداء تعرفني'
```

### إزالة التطويل

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTatweel('كن جميـــلا ترى الوجــود جميـــــلا'));
// Output: 'كن جميلا ترى الوجود جميلا'
```

### التحويل إلى العربية القديمة

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.toOldArabic('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// Output: 'الحىل واللىل والٮىدا ٮعرڡٮى'
```

### التحويل إلى العربية القديمة وتشفير الكلمات المحظورة

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.toOldArabicAndTashfeerPannedWords('جيش العدو يقتل الأطفال'));
// Output: 'چـێـݭ !ڵعـݚۉ ی۪ـڨـټل الاطڡال'
```

### التشفير

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.tashfeer('هذا النص مشفر'));
// Output: 'هـۮו اڵـݔص مـݭفـݛ'
```

### تشفير الكلمات المحظورة

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.tashfeerPannedWords('جيش العدو يقتل الأطفال'));
// Output: 'چـێـݭ !ڵعـݚۉ ی۪ـڨـټل الأطفال'
```

### الكلمة إلى حروفها

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.wordToLetters('شجرة'));
// Output: شين جيم راء تاء_مربوطة
```

### إزالة اللواحق

```javascript
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeAffixes('المدرسة'));
// Output: مدرس
```

<br>

## 💡 المساهمة
إذا كنت ترغب في المساهمة في هذا المشروع وتحسينه بأفكار جديدة، فبإمكانك عمل pull request وطلبك مرحب به للغاية. إذا وجدت أي مشكلة، فقط ضعها في قسم الـIssues في المستودع، شكرًا لك.




<div align=center>
<h2>🌟 ضع نجمة على هذا المستودع 🌟</h2>

من فضلك ضع ⭐️ على هذا المستودع وشاركه مع الآخرين
</div>

<br>

## 📜 الرخصة
هذا المشروع مرخص تحت رخصة GPL-3.0. انظر ملف [الرخصة](./LICENSE) لمزيد من التفاصيل.

## 💬 الاتصال

-   📩 البريد الإلكتروني: [SeenDevelopment@gmail.com](mailto:SeenDevelopment@gmail.com)
-   🌎 [الموقع الإلكتروني](https://seen-arabic.github.io/)
