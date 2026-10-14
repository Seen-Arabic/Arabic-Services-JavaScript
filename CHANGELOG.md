<h1 align=center>📜 Changelog - سجل التغيير</h1>
<p align=center>All notable changes to this project will be documented in this file.</p>

## [Unreleased](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.8...HEAD)

### Added

-   **Tree Shaking & Named Exports**: Full support for tree shaking with direct named exports for all functions, constants, and utilities, reducing bundle size by over 96% when importing specific functions ([#28](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/28)).
-   **Dual Module System (ESM & CommonJS)**: Added native ES Module build under `dist/esm/` with `sideEffects: false` and conditional typed exports in `package.json`.
-   **Documentation & Guidelines**: Added `CONTRIBUTING.md` with Conventional Commits specifications and `AGENT.md` tailored for zero-runtime-dependency npm library development ([PR #30](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/30)).

### Updated

-   **Tooling Modernization**: Migrated to ESLint 9 Flat Config (`eslint.config.mjs`) with `typescript-eslint` v8 ([PR #31](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/31)).
-   **Dependencies**: Upgraded devDependencies (`typescript` 5.7, `webpack` 5.98, `prettier` 3.5, `ts-jest` 29.2) and replaced deprecated `rimraf` with native Node.js `fs.rmSync`.

## [1.0.8](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.8) - 2025-09-04 (12 Rabi' al-Awwal 1446)

### Added

-   **"Sequential Tanween" (`التنوين المتتابع`)** in the Tashkeel list ([#27](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/27))
-   **Expand Arabic letter replacement dictionary**: Added new replacement characters for ت, ث, ح, ص, ن, and و in LETTERS_TASHFEER_REPLACEMENT_DICT to improve coverage and flexibility for letter substitutions.

### Updated

-   **Security Updates**: Updated package dependencies to address and fix security vulnerabilities.
-   **CI/CD**: Updated GitHub Actions with Node.js 22.x and upgraded action versions.

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.7...v1.0.8)

## [1.0.7](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.7) - 2024-01-19 (07 Rajab 1445)

### Updated

-   **Improved Old Arabic Letters** in [PR #25](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/25): Introduced options for handling specific Arabic characters to avoid distortion issues in certain fonts or text editors. These enhancements include:
    -   `replaceMidNoonWithBah`: An option to transform the mid-word Noon character to a dotless Bah (enabled by default).
    -   `replaceMidYahWithBah`: An option to transform the mid-word Yah character to a dotless Bah (disabled by default).

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.6...v1.0.7)

## [1.0.6](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.6) - 2023-12-03 (19 Jumada al-awwal 1445)

### Fixed

-   Remove Arabic Affixes does not work with sentences ([#21](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/21))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.5...v1.0.6)

## [1.0.5](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.5) - 2023-12-03 (19 Jumada al-awwal 1445)

### Updated

-   Trim text before converting ([#22](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/22))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.4...v1.0.5)

## [1.0.4](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.4) - 2023-11-30 (16 Jumada al-awwal 1445)

### Updated

-   rename `Panned` to `Banned`: which is the correct translation of `محظور` ([PR #19](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/19))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.3...v1.0.4)

## [1.0.3](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.3) - 2023-11-18 (04 Jumada al-awwal 1445)

### Added

-   Convert To Old Arabic And Tashfeer Banned Words: Transform Arabic text into old script and replace Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media) ([#18](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/18))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.2...v1.0.3)

## [1.0.2](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.2) - 2023-11-18 (04 Jumada al-awwal 1445)

### Added

-   Tashfeer Banned Words: Replaces Banned Arabic text with visually similar characters for encoding purposes. (Banned words are words that considered as hate speech in social media) ([#16](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/16))
-   Remove Arabic Affixes: Removes predefined affixes (prefixes and suffixes) from an Arabic word if it starts or ends with those affixes. ([#17](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/17))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.1...v1.0.2)

## [1.0.1](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.0.1) - 2023-11-15 (Jumada al-awwal 1445)

### Added

-   Word To Letters: Convert Arabic word to its pronounced letters. ([#2](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/2))

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/1.0.0...v1.0.1)

## [1.0.0](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/1.0.0) - 2023-11-07 (23 Rabi` al Thani 1445)

### Added

-   Initial release of the library with the following functionalities:
    -   Tashkeel Removal: Easily remove Tashkeel from Arabic text. ([#12](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/12))
    -   Tatweel Removal: Remove Tatweel character from Arabic phrases. ([#8](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/8))
    -   Convert To Old Arabic: Transform Arabic text into old script. ([#9](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/9))
    -   Tashfeer: Replaces Arabic text with visually similar characters for encoding purposes. ([#13](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/13))
