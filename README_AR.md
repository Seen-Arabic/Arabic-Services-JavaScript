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
<a href="https://www.npmjs.com/package/arabic-services"><img src="https://img.shields.io/npm/dt/arabic-services.svg" alt="npm downloads badge"></a>
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
-   ...والمزيد!

<h3 align=center><a href="https://github.com/Seen-Arabic/Arabic-Services-JavaScript/wiki/Features%E2%80%90Documentation%E2%80%90AR">➡️ شاهد استخدام كل ميزة من المكتبة وطريقة استخدامها في الكود ⬅️</a></h3>

## 🚀 البدء السريع

تعمل Arabic-Services في كل من المتصفح وبيئة NodeJS.

### المتصفح

نوفر حزم ESM و IIFE للاستخدام في المتصفح. يمكن العثور عليها في مجلد dist.

```html
<script src="dist/index.global.js"></script>
<script>
	console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
	// الناتج: 'الخيل والليل والبيداء تعرفني'
</script>
```

### NodeJS

تم توفير مكتبات CommonJS و ES Module.

```bash
npm install arabic-services
```

**CommonJS:**

```js
const { ArabicServices } = require('arabic-services');
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// الناتج: 'الخيل والليل والبيداء تعرفني'
```

**ES Module:**

```js
import { ArabicServices } from 'arabic-services';
console.log(ArabicServices.removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
// الناتج: 'الخيل والليل والبيداء تعرفني'
```

## 💡 المساهمة

تم إتاحة خدمات اللغة العربية للجمهور لتوفير مكتبة مُجربة جيدًا وموثقة بشكل جيد لمعالجة وتحويل النصوص العربية لجميع المطورين. نحن نقبل مساهمات الميزات بشرط أن تكون موثقة بشكل صحيح وتشمل الاختبارات المناسبة.

-   🚀 إذا كنت ترغب في المساهمة في هذا المشروع وتحسينه بأفكار جديدة، فبإمكانك عمل pull request وطلبك مرحب به للغاية.
-   📝 إذا وجدت أي مشكلة، فقط ضعها في قسم الـIssues في المستودع، شكرًا لك.

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
