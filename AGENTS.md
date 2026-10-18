# arabic-services

A zero-runtime-dependency TypeScript library for Arabic text in Node.js and browsers.

## Working rules

- Inspect source, callers, tests and configuration before editing. Verify current versions and scripts.
- Keep changes focused, reuse existing utilities and preserve unrelated work. Explain a short plan for non-trivial changes.
- Analysis and review requests do not authorize implementation.
- Preserve public APIs, defaults, output behavior and CJS/ESM/UMD/type entry points. Agree on breaking changes first.
- Treat output/default changes as compatibility changes even when TypeScript signatures stay unchanged; follow semantic versioning.
- Keep zero runtime dependencies. Ask before installing or upgrading packages.
- Use simple, strongly typed code. Keep library logic independent of Node built-ins, the DOM and environment state.
- For substantial design choices, explain the main trade-off and consider a simpler native JavaScript alternative.
- Bound processing time and memory for untrusted input; avoid unbounded loops, retries and caches.
- Respect Unicode code points, UTF-16 indices and combining marks. Make lossy normalization explicit.
- Do not describe affix stripping as morphological analysis or visual obfuscation as encryption.
- Add focused regression tests for behavior changes, including mixed scripts, empty input and adversarial regex cases where relevant.
- Update affected English/Arabic docs and release notes. Follow existing contribution conventions.
- Document actual APIs and commands; clearly label proposed features. Do not invent capabilities or performance claims.
- Verify third-party licenses; do not copy implementations or expose secrets/private input.
- Do not manually edit generated output or lockfiles unless requested. Ask before commits, pushes, publishing or destructive operations.

## Validation

- Use installed tools; start with the narrowest relevant lint, type or test check, then broaden when justified. Current scripts include `npm run lint` and `npm test`.
- For export/build changes, verify fresh package artifacts and declarations through CJS, ESM and browser consumers; source tests alone are insufficient. Inspect build/cleanup scripts first.
- Check bundle size and tree-shaking when changing imports, exports or dependencies; measure before claiming improvements.
- For documentation-only changes, check formatting and references without building. Avoid autofix during read-only reviews.
- Review the final diff. Report exact checks, results and skipped validation; distinguish evidence from assumptions.
