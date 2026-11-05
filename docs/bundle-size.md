# Bundle size reporting

Build first, then run the report:

```bash
npm run build
npm run size:report
```

The report measures the npm package with `npm pack --dry-run --ignore-scripts --json`. It shows the packed tarball size, unpacked size, file count, and unpacked bytes grouped into source maps, TypeScript source, declaration files, JavaScript runtime files, and other files. The categories are mutually exclusive; maps are counted before source and declaration extensions.

It also bundles three consumers with the installed Webpack production configuration and `devtool: false`: named `removeTashkeel`, named `removeArabicAffixes`, and the complete default export assigned to `globalThis.result`. The final row measures the built UMD file. Raw and gzip byte counts are shown for all four bundles. These are representative measurements, not guaranteed sizes for every bundler or gzip implementation.

Save a JSON report and compare a later run with it:

```bash
npm run --silent size:report -- --json > size-baseline.json
npm run size:report -- --baseline=size-baseline.json
```

In PowerShell, use `npm.cmd` in these commands so the `npm.ps1` wrapper does not consume the forwarded options.

For a repository-wide reference point, [`bundle-size-baseline.json`](bundle-size-baseline.json) records the package and npm versions and the Webpack, Node.js, and gzip settings used for the measurement.

Use `--json` on a comparison to emit the current report, baseline, and numeric deltas as JSON. The command reports measurements without enforcing size thresholds.

Production bundlers can omit unused exports from ESM imports. Using the full default object retains the full API; CommonJS `require` does not provide native tree-shaking. The npm package size also includes published TypeScript sources, source maps, declarations, and other package files, so it is different from the size of a consumer bundle.

Source maps make published output easier to debug and explain a substantial part of install size. The report counts their bytes separately; disabling or removing maps changes the debugging experience and should be considered independently from consumer bundle size.
