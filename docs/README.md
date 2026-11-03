# Technical documentation

These articles explain how the current source works, why its rules exist, and where its results can be misleading. They describe the repository revision you are reading, including behavior recorded under [Unreleased](../CHANGELOG.md); an installed npm release may behave differently.

| Article                                                    | What it explains                                                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [Arabic affix removal](algorithms/arabic-affixes.md)       | Listed prefix/suffix removal, the short-result guard, word boundaries, and linguistic limitations. |
| [Banned-word matching](algorithms/banned-word-matching.md) | Exact matching, similarity matching, and why matching keeps its own stripping policy.              |

For installation and public API usage, start with the [English README](../README.md) or [Arabic README](../README_AR.md).

## Keeping articles accurate

When changing documented behavior, update its article and regression examples together. Explain the decision and its trade-offs; link to the implementation and tests rather than copying their full contents. Include known failures alongside successful examples. Treat experiment results as evidence for a particular input set, not as a general accuracy guarantee.
