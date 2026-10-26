# Contributing to Arabic Services

Thank you for your interest in contributing to Arabic Services! This library is dedicated to providing reliable, well-tested, and clean utility functions for processing Arabic text in Node.js and the browser.

---

## 🛠️ Getting Started

1. **Fork and clone** the repository:
    ```bash
    git clone https://github.com/<your-username>/Arabic-Services-JavaScript.git
    cd Arabic-Services-JavaScript
    ```
2. **Install dependencies**:
    ```bash
    npm ci
    ```
3. **Verify the project**:
    ```bash
    npm test
    ```

---

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to keep the Git history clean and predictable:

```
<type>(<optional scope>): <description>
```

### Types

- `feat`: A new feature or utility function (e.g., adding a new Arabic text filter or character mapping)
- `fix`: A bug fix (e.g., correcting Tashkeel stripping for sequential tanween)
- `docs`: Documentation-only changes (e.g., README updates, wiki changes)
- `test`: Adding or correcting tests (e.g., new test cases in `tests/scripts.test.ts`)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `chore`: Tooling, build config, dependency upgrades, or CI/CD adjustments

### Examples

```
feat: add sequential tanween to tashkeel list
fix: handle word prefixes correctly in removeArabicAffixes
docs: clarify browser bundle usage via CDN
test: add test cases for dotless noon transformation
chore: update devDependencies to latest versions
```

---

## 🔍 Development & Code Quality

Before submitting a Pull Request, please ensure:

1. **Tests pass**:
    ```bash
    npm test
    ```
    `npm test` runs source tests, builds the package once, then checks the compiled artifacts.
    Use `npm run test:unit` (or `npm run test:watch`) during development without building.
    After an existing build, use `npm run test:artifacts` to check CJS/ESM/UMD consumers, npm package contents, source maps, and real bundle tree shaking. It reports minified sizes for a single-function consumer and the full object; results depend on the imports and installed bundler version.
    Add focused source regression tests for new logic or bug fixes, and artifact tests for packaging or export changes.
2. **Code is clean and formatted**:
    ```bash
    npm run lint
    npm run format:check
    ```
    Use `npm run format` to apply formatting when needed. Git and the formatter use LF line endings; the changelog and generated lockfile are excluded from bulk formatting.
3. **Release notes are current**: Add notable changes under `[Unreleased]` in `CHANGELOG.md`. Preserve published entries, their formatting, and Gregorian and Hijri dates.

## Release verification

The publishing workflow checks out the release tag, verifies it matches `v` plus the `package.json` version, and runs formatting, lint, source tests, a fresh build, and artifact tests before publishing. Manual workflow runs require the existing tag as input.

CI publishes those verified artifacts with [`--ignore-scripts`](https://docs.npmjs.com/cli/v11/using-npm/config/#ignore-scripts) to avoid rebuilding them. A local `npm publish` still runs `prepublishOnly` to build first. Publishing and release creation require maintainer authorization.

---

## 🕌 Arabic Text & NLP Guidelines

When contributing text processing logic:

- **Text Operations**: Keep library logic independent of environment state. Preserve intentional randomness in visual obfuscation and make its tests reproducible. Visual obfuscation does not provide cryptographic protection.
- **Unicode Awareness**: Arabic diacritics (Harakat/Tashkeel) and special characters (Tatweel, Wasla, Madda) have specific Unicode codepoints. Make sure regex patterns and character checks account for them correctly.
- **Dual Runtime Support**: Ensure changes work seamlessly in both Node.js and web browsers. Avoid importing Node-only packages into `src/`.
