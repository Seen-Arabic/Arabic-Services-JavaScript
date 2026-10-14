# Arabic Services Agent Instructions

This repository contains `arabic-services`: a TypeScript utility library for processing, transforming, and manipulating Arabic text in Node.js and modern web browsers.

---

## General Rules

- Inspect the relevant code, docs, tests, and configuration before changing files.
- Search the existing codebase first, and reuse nearby utilities, constants, regex helpers, patterns, and scripts where possible.
- Prefer small, focused, reusable changes that solve the request with the lowest safe scope.
- Do not modify files for analysis, explanation, or review-only requests. When implementation is requested, briefly explain the likely root cause, assumptions, and short plan before editing.
- For reports and proposals, follow the critique / devil's advocate rules below.
- Do not introduce new dependencies, abstractions, or patterns unless clearly justified.
- Never run destructive commands, mass file operations, resets, force pushes, cleanups, or database-changing commands without explicit user approval.
- For every change, explain what changed, why, risks or side effects, and how to test it.
- If something is unclear, state the uncertainty and choose the lowest-risk path.
- Keep secrets untouched. Do not print, read, or inspect `.env`, `appsettings.json`, or credential files under any circumstances.

---

## Project Map

- `README.md` & `README_AR.md`: Project entry points in English and Arabic.
- `CHANGELOG.md`: Release history maintaining both Gregorian and Hijri calendar dates.
- `CONTRIBUTING.md`: Contribution guide and commit message conventions.
- `src/index.ts`: Main entry point and public export surface (`ArabicServices`).
- `src/options.ts`: Shared configuration interfaces (e.g., `OldArabicOptions`).
- `src/constants/`:
  - `arabic-letters.ts`: Arabic alphabet, letter variations, and character mappings.
  - `tashkeel.ts`: Diacritics, Harakat, and Tanween constants.
  - `banned-words.ts`: Sensitive or banned word dictionaries used in obfuscation/tashfeer.
- `src/scripts/`:
  - `scripts.ts`: Core implementations of text manipulation functions (Tashkeel removal, Tatweel removal, Tashfeer, Old Arabic conversion, Affixes removal, etc.).
- `src/utils/`:
  - `string.util.ts`: General-purpose string and regex helper utilities.
- `tests/`:
  - `scripts.test.ts`: Unit test suite covering all text operations.
  - `constants.test.ts`: Sanity checks for constants and mappings.
- `webpack.config.cjs`: Bundler configuration for UMD (`dist/umd/`) and ESM (`dist/esm/`) browser artifacts.

---

## Arabic NLP & Domain Rules

- **Pure Functions**: Text transformation functions must remain pure (deterministic, no global mutation, no side effects).
- **Unicode & Diacritics**: Arabic characters have unique Unicode points for letters, ligatures, Tatweel (`\u0640`), and Tashkeel (`\u064B`-`\u0652`, `\u0670`, sequential tanween, etc.). Avoid naive string slicing; respect Unicode code point boundaries.
- **RTL & Display**: Ensure transformed output does not inadvertently introduce hidden directional marks or corrupt character joining (Kashida/Tatweel).
- **Cross-Platform Compatibility**: The library must execute identically in Node.js and browser environments. Never import Node.js built-ins (`fs`, `path`, `os`, `crypto`) inside `src/`.
- **Test-Driven Changes**: Every bug fix or new feature in `src/scripts/scripts.ts` must have corresponding test cases in `tests/scripts.test.ts`.

---

## Build, Test, and Development Commands

- `npm test`: Run Jest unit tests and generate coverage report.
- `npm test -- -t "test name"`: Run a targeted test case.
- `npm run dev`: Run local scratch runner using `ts-node src/index.ts`.
- `npm run build`: Compile TypeScript into `dist/` (generates `.js` and `.d.ts`).
- `npm run bundle`: Run Webpack to bundle production UMD and ESM scripts for browsers.
- `npm run lint`: Check linting via ESLint without failing on warnings.
- `npm run lint:fix`: Auto-fix linting issues.
- `npm run format`: Format files using Prettier according to `.prettierrc`.

---

## Reports, Proposals, And Devil's Advocate

- Do not only present the happy path.
- Challenge assumptions and separate verified evidence from inference.
- Include the strongest counterargument against the recommended solution.
- Compare at least one simpler or lower-risk alternative when one exists.
- Call out likely side effects, regression risks, and operational risks.
- Prefer concise reviewer-style wording when the user needs a comment, issue reply, PR note, or handoff message.
- If asked for a recommendation, end with a clear recommendation.

---

## Commit Messages

- Follow `CONTRIBUTING.md` when generating or formatting commit messages (Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
