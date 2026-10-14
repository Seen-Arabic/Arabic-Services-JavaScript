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
   npm install
   ```
3. **Verify tests pass**:
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
fix: handle word prefixes correctly in removeAffixes
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
   Add unit tests in `tests/scripts.test.ts` for any new logic or bug fix.
2. **Code is clean and formatted**:
   ```bash
   npm run lint
   npm run format
   ```
3. **TypeScript builds cleanly**:
   ```bash
   npm run build
   ```

---

## 🕌 Arabic Text & NLP Guidelines

When contributing text processing logic:
- **Pure Functions**: Keep functions deterministic, side-effect free, and performant.
- **Unicode Awareness**: Arabic diacritics (Harakat/Tashkeel) and special characters (Tatweel, Wasla, Madda) have specific Unicode codepoints. Make sure regex patterns and character checks account for them correctly.
- **Dual Runtime Support**: Ensure changes work seamlessly in both Node.js and web browsers. Avoid importing Node-only packages into `src/`.
