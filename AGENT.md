# Arabic Services Agent Instructions

This repository contains `arabic-services`: a zero-runtime-dependency TypeScript utility library for processing, transforming, and manipulating Arabic text in Node.js and modern web browsers.

---

## General Rules

- **Inspect First**: Inspect existing code, docs, tests, and configuration before changing files.
- **Search Before Adding**: Search the existing codebase first; reuse nearby utilities, constants, regex helpers, and patterns in `src/constants/` and `src/utils/`.
- **Zero Runtime Dependencies**: The library must maintain **zero runtime dependencies** (`"dependencies"` in `package.json` must remain empty). All operations must rely strictly on standard TypeScript/JavaScript algorithms and regular expressions.
- **Minimum Safe Scope**: Prefer small, focused, reusable changes that solve the request with the lowest safe scope.
- **Never Modify Without Instructions**: Do not modify files for analysis, explanation, or review-only requests. When implementation is requested, briefly explain the root cause, assumptions, and short plan before editing.
- **Backwards Compatibility**: Existing public function signatures and return types must not break existing npm consumers without explicit major-version discussion.
- **Explain Every Change**: For every change, explain what changed, why, risks or side effects, and how to verify it.
- **Safe Commands Only**: Never run destructive Git commands (force push, hard reset, cleanups) or mass file deletions without explicit user approval.
- **Package Security**: Never hardcode, commit, or print npm publishing tokens (`NODE_AUTH_TOKEN`), CI credentials, or local environment files.

---

## Project Map

- `README.md` & `README_AR.md`: Library entry points, examples, and feature showcases in English and Arabic.
- `CHANGELOG.md`: Release notes following standard semver, documenting both Gregorian and Hijri calendar dates.
- `CONTRIBUTING.md`: Contribution guide and Conventional Commits guidelines.
- `src/index.ts`: Main entry point and public export surface (`ArabicServices`).
- `src/options.ts`: Public configuration types and interfaces (e.g., `OldArabicOptions`).
- `src/constants/`:
  - `arabic-letters.ts`: Arabic alphabet mappings, variations, and substitution dictionaries.
  - `tashkeel.ts`: Diacritics (Harakat, Tanween, Quranic sequential tanween).
  - `banned-words.ts`: Word lists used in obfuscation/tashfeer algorithms.
- `src/scripts/`:
  - `scripts.ts`: Implementation of text manipulation functions (Tashkeel removal, Tatweel removal, Tashfeer, Old Arabic conversion, Affixes removal, etc.).
- `src/utils/`:
  - `string.util.ts`: Internal string manipulation and regex utility functions.
- `tests/`:
  - `scripts.test.ts`: Vitest unit tests covering all text operations.
  - `constants.test.ts`: Sanity checks for character mappings and constants.
  - `artifacts.test.ts`: Module integrity tests for CJS, ESM, and browser UMD bundles.
  - `edge-cases.test.ts`: Boundary values, orthography variations, and ReDoS resilience tests.
  - `tree-shaking.test.ts`: Verification of named exports and dead code elimination.
- `webpack.config.cjs`: Bundler configuration generating UMD (`dist/umd/`) and ESM (`dist/esm/`) bundles for browser distribution.
- `tsconfig.json`: TypeScript compiler configuration targeting ES5 / CommonJS for the main npm distribution.

---

## Arabic NLP & Domain Rules

- **Pure Functions**: Every utility function must be pure, deterministic, and free of side effects. Input strings must never be mutated.
- **Unicode Code Point Integrity**: Arabic characters have unique Unicode points for letters, ligatures, Tatweel (`\u0640`), Tashkeel (`\u064B`-`\u0652`, `\u0670`, sequential tanween, etc.). Avoid naive character splitting that breaks multi-byte or combining marks; always respect Unicode boundaries.
- **Regular Expressions & ReDoS**: Regular expressions must be tested against catastrophic backtracking (ReDoS). Prefer pre-compiled regexes or Set/Dictionary lookups for character replacement rather than dynamic nested patterns.
- **Dual Runtime Support**: The core library runs in both Node.js and web browsers. Never import Node-specific built-ins (`fs`, `path`, `crypto`, `os`) inside `src/`.
- **Test-Driven Changes**: Every bug fix, edge case, or new feature in `src/scripts/scripts.ts` must be accompanied by unit tests in `tests/scripts.test.ts`.

---

## Build, Test, and Development Commands

- `npm run build`: Compile TypeScript into `dist/` (generates `.js` and `.d.ts`).
- `npm test`: Run Vitest test suite and generate coverage report. **Note**: Run `npm run build` before `npm test`, as tests import from the compiled `./dist` directory.
- `npm test -- -t "test name"`: Run a specific test case by name.
- `npm run dev`: Quick execution runner using `ts-node src/index.ts`.
- `npm run bundle`: Run Webpack to bundle production UMD (`arabic-services.umd.js`) and ESM (`arabic-services.esm.js`) files for browser/CDN distribution.
- `npm run lint`: Run ESLint to check code quality.
- `npm run lint:fix`: Auto-fix ESLint errors.
- `npm run format`: Format files using Prettier.
- `npm run clean`: Clean the `dist/` build directory.

---

## Proposals, Reviews, And Devil's Advocate

- Do not present only the happy path.
- Challenge assumptions and separate verified codebase evidence from guesses.
- Include counterarguments against proposed architectures or third-party tooling.
- Compare simpler, zero-dependency alternatives when available.
- Highlight performance implications on string parsing, memory allocation, and bundle size.
- Prefer concise, actionable wording suitable for PR reviews or GitHub issues.

---

## Commit & PR Conventions

- Commit messages and PR titles must follow `CONTRIBUTING.md` using the Conventional Commits specification (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
- Document new features, bug fixes, or tooling updates under `## [Unreleased]` in `CHANGELOG.md` following Keep a Changelog conventions.
