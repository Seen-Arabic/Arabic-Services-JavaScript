# Banned-word matching: exact lookup before similarity

`tashfeerBannedWords` and `toOldArabicAndTashfeerBannedWords` select tokens for visual obfuscation using the package's predefined `BANNED_WORDS` list. The name describes that list's role in the API; it is not a claim that a word is harmful or that an external platform bans it. The implementation does not consult platform policies or understand sentence meaning.

This article describes the current source, including exact-match handling recorded under [Unreleased](../../CHANGELOG.md).

## The matching pipeline

Both functions trim the input and split it on the literal space character (`' '`). For each resulting token:

1. Check whether the original token is an exact entry in `BANNED_WORDS`. This comparison is case-sensitive and does not normalize the token.
2. If not, apply the legacy listed prefix/suffix stripping routine described in [Arabic affix removal](arabic-affixes.md), **without its three-letter guard**.
3. Compare that stripped token with every entry in the list using `similarityScore`. List entries themselves are not stripped in this step.
4. Select the token if its highest score is at least `0.7` (70%).

There is no additional diacritic removal, spelling normalization, or punctuation separation in this matching pipeline. In particular, it does not use the public affix function's newer word-boundary handling.

## Why exact matching comes first

`فلسطين` is an explicit list entry. Stripping first produces `فلسط`, which can miss the 70% threshold against the original entry. The exact lookup ensures an explicitly listed token is recognized before a lossy transformation can change it.

Matching still uses similarity after an exact miss, so a token does not have to appear literally in the list to be selected.

| Token    | Exact entry? | Legacy candidate, if needed | Outcome                                                     |
| -------- | ------------ | --------------------------- | ----------------------------------------------------------- |
| `فلسطين` | Yes          | Not needed                  | Selected by exact lookup.                                   |
| `غزة`    | No           | `غز`                        | Selected: the candidate is an exact match for a list entry. |
| `حرية`   | No           | `حر`                        | Selected: the candidate is an exact match for a list entry. |
| `عزة`    | No           | `عز`                        | Selected: the candidate is an exact match for a list entry. |
| `كتابهم` | No           | `كتاب`                      | Selected: the candidate is an exact match for a list entry. |
| `نور`    | No           | `ور`                        | Not selected by the current list and threshold.             |

## What the similarity score measures

`similarityScore` lowercases both strings, then calculates Levenshtein edit distance over UTF-16 code units. It returns:

```text
1 - distance / max(lowercasedFirst.length, lowercasedSecond.length)
```

For two empty strings it returns `1`. The score measures character edits, not meaning, confidence, or probability. A 70% threshold is an existing matching policy, not a measured 70% linguistic accuracy rate.

```javascript
import { similarityScore, tashfeerBannedWords } from 'arabic-services';

similarityScore('كتاب', 'كتاب'); // 1
similarityScore('كتاب', 'كتا'); // 0.75
tashfeerBannedWords('نور'); // 'نور'
tashfeerBannedWords('فلسطين'); // Randomized visual obfuscation; no fixed output string.
```

## Why matching keeps the legacy stripping policy

The public affix function now retains `غزة`, `حرية`, and `عزة` because their stripped candidates have fewer than three Arabic letters. Matching historically relies on those short candidates (`غز`, `حر`, `عز`), which are stored in the list.

Reusing the guarded public function would change recognition. Instead, both paths share the existing stripping routine while applying different acceptance rules. The routine is imported directly between source modules and omitted from package-root exports; it does not add a public matching API or a new configuration flag.

## What happens after a match

Both public functions accept a `levelOfTashfeer` argument with default `2`. They apply obfuscation to the original selected token, not its stripped candidate. The output varies because replacement positions and characters use randomness.

For tokens that are not selected:

- `tashfeerBannedWords` keeps the token unchanged.
- `toOldArabicAndTashfeerBannedWords` converts it using `toOldArabic`.

The level must be a non-negative finite integer. Negative, fractional, or non-finite values throw `RangeError`; non-number values throw `TypeError`.

```javascript
import { tashfeerBannedWords } from 'arabic-services';

try {
	tashfeerBannedWords('فلسطين', -1);
} catch (error) {
	if (!(error instanceof RangeError)) throw error;
	// Choose a non-negative integer level before retrying.
}
```

## Known limitations

Literal-space splitting means newlines, tabs, and attached punctuation are not independent matching boundaries. They can change the token being compared, so recognition of a word alone does not guarantee recognition inside every surrounding text format.

Fuzzy matching can select unrelated words or miss intended variants. The list and threshold encode application-specific choices, not a general moderation classifier. Visual substitution also does not provide cryptographic confidentiality or guarantee any external platform's treatment of the resulting text.

## Implementation and verification

- [Matching and obfuscation pipeline](../../src/scripts/tashfeer.ts).
- [Matching list](../../src/constants/banned-words.ts) and [similarity calculation](../../src/utils/string.util.ts).
- [Recognition compatibility tests](../../tests/affixes.test.ts), which seed randomness and check both public functions.
- [General behavior tests](../../tests/scripts.test.ts) and [boundary tests](../../tests/edge-cases.test.ts).

Run `npm run test:unit` for source behavior. Run `npm test` for fresh builds and artifact checks as well. Passing these tests does not establish a general detection accuracy rate.
