const assert = require("assert");
const ArabicService = require("../index");

describe("#removeTashkeel()", () => {
    describe("Test with Poetry Text", () => {
        it("should remove all tashkeel from Poetry text", () => {
            const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
            const actual = ArabicService.removeTashkeel(text);
            const expected = `الخيـل والليـل والبيـداء تعرفني والسيف والرمح والقرطاس والقلـم`;
            assert.equal(expected, actual);
        });
    });

    describe("Test with Quran Text", () => {
        it("should remove all tashkeel from Quran text", () => {
            const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
            const actual = ArabicService.removeTashkeel(text);
            const expected = `وقالوا الحمد لله الذي أذهب عنا الحزن إن ربنا لغفور شكور`;
            assert.equal(expected, actual);
        });
    });
});

describe("#toOldArabic()", () => {
    describe("Test ن letter", () => {
        it("should convert ن to ں last letter, else convert it to ٮ", () => {
            const text = `ننن`;
            const actual = ArabicService.toOldArabic(text);
            const expected = `ٮٮں`;
            assert.equal(expected, actual);
        });
    });

    describe("Test Tatweel with ن letter", () => {
        it("should convert ن to ں last letter, else convert it to ٮ", () => {
            const text = `نــنــن`;
            const actual = ArabicService.toOldArabic(text);
            const expected = `ٮــٮــں`;
            assert.equal(expected, actual);
        });
    });

    describe("Test with Poetry Text", () => {
        it("should remove all dots & tashkeel from Poetry text", () => {
            const text = `الخَيْـلُ وَاللّيْـلُ وَالبَيْـداءُ تَعرِفُني وَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَـمُ`;
            const actual = ArabicService.toOldArabic(text);
            const expected = `الحىـل واللىـل والٮىـدا ٮعرڡٮى والسىڡ والرمح والٯرطاس والٯلـم`;
            assert.equal(expected, actual);
        });
    });

    describe("Test with Quran Text", () => {
        it("remove tashkeel from Quran text", () => {
            const text = `وَقَالُواْ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِيٓ أَذۡهَبَ عَنَّا ٱلۡحَزَنَۖ إِنَّ رَبَّنَا لَغَفُورٞ شَكُورٌ`;
            const actual = ArabicService.removeTashkeel(text);
            const expected = `وقالوا الحمد لله الذي أذهب عنا الحزن إن ربنا لغفور شكور`;
            assert.equal(expected, actual);
        });
    });
});

describe("#removeTatweel()", () => {
    it("should remove all tatweel 'ـ' from text", () => {
        const text = "رائـــــــع";
        const actual = ArabicService.removeTatweel(text);
        const expected = "رائع";
        assert.equal(expected, actual);
    });
});
