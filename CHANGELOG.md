<h1 align=center>📜 Changelog - سجل التغيير</h1>
<p align=center>All notable changes to this project will be documented in this file.</p>
## [Unreleased]

## [1.1.1](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.1.1) - 2026-11-04 (24 Jumada al-Awwal 1448)

### Added
-   **Extensionless TypeScript Imports**: Enabled extensionless static relative imports and directory barrels in source builds; the ESM build emits explicit `.js` relative references while retaining the CJS and browser UMD package entry paths ([PR #45](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/45)).
-   **Built Artifact Coverage**: Added CJS, ESM, and browser UMD integration checks, package-content and source-map checks, and built-consumer tree-shaking checks.
-   **Arabic Affix and Banned-Word Guides**: Added focused technical documentation, direct jsDelivr and unpkg links, and a GitHub browser-bundle guide.
-   **Published Sources and Maps**: Included original TypeScript sources and JavaScript source maps for CJS, ESM, UMD, and browser ESM outputs, plus declaration maps for CJS and ESM ([PR #40](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/40)).

### Updated
-   **Modular TypeScript Sources**: Split the monolithic script implementation into focused modules while preserving function names and the public function export set ([PR #38](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/38)).
-   **ESM Namespace Objects**: Kept the keys and values of `ArabicServices.constants` and `ArabicServices.utils` while changing their object prototypes, extensibility, and property descriptors.
-   **Browser Demo and Test Commands**: Moved the standalone browser demo to `examples/browser/index.html` and separated source and compiled-artifact test commands; `npm test` runs both suites around one build.
-   **CI and Publishing Runtime**: Added CI coverage for Node.js 22.x and 24.x and moved the publish workflow to Node.js 24.
-   **Development Dependencies**: Refreshed `typescript-eslint` and its packages to 8.72.1, `fast-uri` to 3.1.9, and `ignore` to 7.0.14 within existing manifest ranges.

### Fixed
-   **Short Affix Results**: Preserve the original word when removing listed affixes would leave fewer than three Arabic-script letters. This changes results for some short words, including `نور`, `بنت`, and `اليد`; the transformation remains heuristic ([PR #44](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/44)).
-   **Separator Handling**: Process affix removal independently across letter, mark, and number sequences while preserving separators. Unicode property escape support is required when this function is called ([PR #44](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/44)).
-   **Exact Banned-Word Matching**: Check listed words such as `فلسطين` before lossy affix stripping, while retaining the existing affix-based similarity path. Exact matching is case-sensitive and does not normalize tokens ([PR #43](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/43)).
-   **Similarity Scores**: Calculate string lengths after lowercasing so Unicode case expansion does not produce scores outside the documented 0–1 range; edit distance remains based on UTF-16 code units ([PR #42](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/42)).
-   **Obfuscation-Level Validation**: Reject non-number levels with `TypeError` and negative, fractional, or non-finite levels with `RangeError`; empty input terminates and random-index counts are capped at the word length ([PR #36](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/36)).
-   **Publishing Workflow**: Continue browser-bundle upload after a successful build when npm publishing fails.
-   **Development Script**: Removed the unused `dev` command, which relied on an uninstalled `ts-node` runner.

### Compatibility notes
- The short-result guard changes some prior affix-removal outputs. Direct JavaScript callers passing string levels now receive `TypeError`; valid numeric inputs remain the typed API.
- In ESM, `ArabicServices.constants` and `.utils` changed from null-prototype, non-extensible namespace objects with data properties to `Object.prototype` objects that are extensible and expose getters. Their keys and values are unchanged, but reflection and augmentation observe the difference.
- Source maps are provided, but some generated re-export facades and a helper remain unmapped; this release does not claim complete map coverage.
- The lockfile audit reported 13 moderate advisories in development-tool dependency paths and no runtime dependencies; this release does not claim an audit-free dependency tree.

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.1.0...v1.1.1)

## [1.1.0](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/releases/tag/v1.1.0) - 2026-10-14 (03 Jumada al-Awwal 1448)

### Added

-   **Tree Shaking & Named Exports**: Full support for tree shaking with direct named exports for all functions, constants, and utilities, reducing bundle size by over 96% when importing specific functions ([#28](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/issues/28)).
-   **Dual Module System (ESM & CommonJS)**: Added native ES Module build under `dist/esm/` with `sideEffects: false` and conditional typed exports in `package.json`.
-   **Browser UMD Bundle**: Bundled single-file UMD build under `dist/umd/arabic-services.umd.js` for direct `<script>` and CDN usage (unpkg / jsdelivr).
-   **Documentation & Guidelines**: Added `CONTRIBUTING.md` with Conventional Commits specifications and `AGENT.md` tailored for zero-runtime-dependency npm library development ([PR #30](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/30)).

### Updated

-   **Test Runner Modernization**: Migrated test runner from Jest to Vitest for native TypeScript execution, faster test execution (under 700ms), and 0-vulnerability dependency tree ([PR #32](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/32)).
-   **Tooling Modernization**: Migrated to ESLint 9 Flat Config (`eslint.config.mjs`) with `typescript-eslint` v8 ([PR #31](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/pull/31)).
-   **Dependencies**: Upgraded devDependencies (`typescript` 5.7, `webpack` 5.98, `prettier` 3.5) and replaced deprecated `rimraf` with native Node.js `fs.rmSync`.
-   **Package Publishing Cleanliness**: Added `"files"` whitelist in `package.json` to prevent development/CI configurations from being published to npm.

[Full Changelog](https://github.com/Seen-Arabic/Arabic-Services-JavaScript/compare/v1.0.8...v1.1.0)

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
