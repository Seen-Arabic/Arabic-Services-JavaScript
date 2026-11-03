# Arabic affix removal: a short-result guard

`removeArabicAffixes(text: string): string` removes predefined prefixes and suffixes. It can be useful when a caller deliberately wants a lossy text transformation. It does not identify grammatical affixes, recover roots, or guarantee that different forms of a word produce the same output.

This article describes the current source, including the guard and boundary handling recorded under [Unreleased](../../CHANGELOG.md).

## Why the guard exists

The original rules remove letters by their position and membership in a list. They cannot tell whether the initial `ن` in `نور` is an affix or part of the word. Applying those rules without a guard turns `نور` into `ور` and `بنت` into `نت`.

The current policy keeps the original word if the **complete stripped result** contains fewer than three Arabic-script letters. Three is a conservative cutoff for this transformation, not a linguistic claim that Arabic stems must have three letters.

## How a word is processed

1. Trim whitespace from the beginning and end of the whole input.
2. Find each contiguous sequence of Unicode letters, combining marks, and numbers. Adjacent Arabic, Latin, and numeric characters belong to the same sequence; this is not language-aware tokenization.
3. Try one listed prefix, checking two characters before one character.
4. On the remaining text, try one listed suffix, again checking two characters before one character. Neither step repeats until no affix remains.
5. Count letters that have both Unicode `Script=Arabic` and category `Letter` in the candidate. Keep the candidate only if at least three are found; otherwise keep the original sequence.

The current lists live in [arabic-letters.ts](../../src/constants/arabic-letters.ts):

- Prefixes: `أ`, `ا`, `إ`, `ال`, `ي`, `ت`, `ن`, `ب`.
- Suffixes: `ة`, `ه`, `ي`, `ى`, `ية`, `ين`, `ون`, `هم`.

Diacritics, tatweel, digits, punctuation, and other scripts do not satisfy the minimum. Interior whitespace, punctuation, and symbols are preserved. The function does not remove diacritics or normalize spelling before trying the lists.

## Examples and counterexamples

| Input    | Candidate after listed stripping | Returned text | Reason                                                                                                 |
| -------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| `نور`    | `ور`                             | `نور`         | Two Arabic letters remain.                                                                             |
| `بنت`    | `نت`                             | `بنت`         | Two Arabic letters remain.                                                                             |
| `الكتاب` | `كتاب`                           | `كتاب`        | Four Arabic letters remain.                                                                            |
| `كتابهم` | `كتاب`                           | `كتاب`        | The listed suffix is removed.                                                                          |
| `اليد`   | `يد`                             | `اليد`        | A legitimate two-letter stem is also rejected.                                                         |
| `يحبون`  | `حب`                             | `يحبون`       | The complete candidate is too short; the function does not retry suffix-only removal to produce `يحب`. |
| `تفاح`   | `فاح`                            | `فاح`         | The guard cannot detect removal of an original letter from a longer word.                              |
| `فلسطين` | `فلسط`                           | `فلسط`        | A listed ending can be part of the original word.                                                      |

```javascript
import { removeArabicAffixes } from 'arabic-services';

removeArabicAffixes('  نور،الكتاب\nبنت  '); // 'نور،كتاب\nبنت'
removeArabicAffixes('المدرسون يحبون طلابهم'); // 'مدرس يحبون طلاب'
```

The fallback is atomic: it rejects the entire stripped candidate rather than approving each deletion separately. Otherwise a partial deletion could survive even when a later deletion should make us retain the original word.

## Why this is not a stemmer replacement

Expanding the prefix list would change which words are cut; it would not resolve whether those letters are original. Replacing this function with a search stemmer or morphological analyzer would also change its output contract and potentially require dictionaries or dependencies. The chosen fix addresses short destructive results while retaining the existing lists and keeping zero runtime dependencies.

This trade-off leaves real limitations: short stems may not be reduced, longer words may still be damaged, and stripping an initial letter before a combining mark can leave that mark without its original base. Use a separate morphological solution when grammatical interpretation is required. Do not use this transformation as a prerequisite for assuming that a word is correctly recognized.

## Runtime and module boundaries

Calling this function requires Unicode property escape support. Its regular expressions are constructed inside the function, so loading the package or calling unrelated APIs does not introduce that requirement. An unsupported engine will throw a `SyntaxError` when the function is called; use a runtime with that support if affix removal is needed.

The underlying stripping routine is shared internally with [banned-word matching](banned-word-matching.md), which deliberately does not apply this guard. That routine is not exported from the package root. Named ESM consumers can import `removeArabicAffixes` without retaining the banned-word matching code and list in their bundle.

## Implementation and verification

- [Affix implementation](../../src/scripts/affixes.ts) and [public script exports](../../src/scripts/index.ts).
- [Guard, Unicode, separator, and matching regression tests](../../tests/affixes.test.ts).
- [Sentence examples](../../tests/scripts.test.ts) and [short-input boundaries](../../tests/edge-cases.test.ts).
- [Built-module and runtime-isolation checks](../../tests/artifacts.test.ts) and [Webpack tree-shaking checks](../../tests/tree-shaking.test.ts).

Run `npm run test:unit` for source behavior. Run `npm test` to also rebuild and validate package artifacts. These checks establish the tested contract, not general linguistic correctness.
