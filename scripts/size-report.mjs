import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import fs from 'node:fs';
import webpack from 'webpack';

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'dist');
const packageMetadata = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const categories = ['maps', 'src', 'declarations', 'runtimeJS', 'other'];
const bundleNames = ['removeTashkeel', 'removeArabicAffixes', 'defaultObject', 'umd'];

function npmVersion() {
	const npmExecPath = process.env.npm_execpath;
	if (!npmExecPath) throw new Error('run this command through npm so npm_execpath is available');
	return execFileSync(process.execPath, [npmExecPath, '--version'], { cwd: rootDir, encoding: 'utf8' }).trim();
}

function fail(message) {
	console.error(`size:report: ${message}`);
	process.exitCode = 1;
}

function getPackageReport() {
	const npmExecPath = process.env.npm_execpath;
	if (!npmExecPath) {
		throw new Error('run this command through npm so npm_execpath is available');
	}

	const output = execFileSync(process.execPath, [npmExecPath, 'pack', '--dry-run', '--ignore-scripts', '--json'], {
		cwd: rootDir,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
	});
	const [pack] = JSON.parse(output);
	if (!pack || !Array.isArray(pack.files)) {
		throw new Error('npm pack returned an unexpected JSON response');
	}

	const categoryBytes = Object.fromEntries(categories.map((category) => [category, 0]));
	for (const file of pack.files) {
		const category = file.path.endsWith('.map')
			? 'maps'
			: file.path.startsWith('src/')
				? 'src'
				: file.path.endsWith('.d.ts')
					? 'declarations'
					: file.path.endsWith('.js')
						? 'runtimeJS'
						: 'other';
		categoryBytes[category] += file.size;
	}

	return {
		packedBytes: pack.size,
		unpackedBytes: pack.unpackedSize,
		fileCount: pack.files.length,
		categoryBytes,
	};
}

function gzipBytes(buffer) {
	return gzipSync(buffer, { level: 9 }).byteLength;
}

function webpackBundles(tempDir) {
	const publicEntry = fileURLToPath(import.meta.resolve('arabic-services'));
	const entrySources = {
		removeTashkeel:
			"import { removeTashkeel } from 'arabic-services'; globalThis.result = removeTashkeel('مَرْحَبًا');",
		removeArabicAffixes:
			"import { removeArabicAffixes } from 'arabic-services'; globalThis.result = removeArabicAffixes('نور بنت الكتاب');",
		defaultObject: "import ArabicServices from 'arabic-services'; globalThis.result = ArabicServices;",
	};
	const entry = {};
	for (const [name, source] of Object.entries(entrySources)) {
		const entryPath = path.join(tempDir, `${name}.mjs`);
		fs.writeFileSync(entryPath, source);
		entry[name] = entryPath;
	}

	return new Promise((resolve, reject) => {
		const compiler = webpack({
			mode: 'production',
			entry,
			output: { path: path.join(tempDir, 'bundles'), filename: '[name].js' },
			devtool: false,
			resolve: { alias: { 'arabic-services$': publicEntry } },
		});
		compiler.run((error, stats) => {
			const finish = (runError) => {
				compiler.close((closeError) => {
					if (runError || closeError) reject(runError ?? closeError);
					else resolve();
				});
			};
			if (error) return finish(error);
			if (!stats || stats.hasErrors()) {
				return finish(new Error(stats?.toString({ all: false, errors: true }) ?? 'Webpack returned no stats'));
			}
			finish();
		});
	});
}

async function getBundleReport(tempDir) {
	await webpackBundles(tempDir);
	const bundles = {};
	for (const name of ['removeTashkeel', 'removeArabicAffixes', 'defaultObject']) {
		const content = fs.readFileSync(path.join(tempDir, 'bundles', `${name}.js`));
		bundles[name] = { bytes: content.byteLength, gzipBytes: gzipBytes(content) };
	}

	const umdPath = path.join(distDir, 'umd', 'arabic-services.umd.js');
	const umd = fs.readFileSync(umdPath);
	return { ...bundles, umd: { bytes: umd.byteLength, gzipBytes: gzipBytes(umd) } };
}

function validateBaseline(report) {
	const baseline = report?.schemaVersion === 1 ? report.current : undefined;
	if (!baseline || !baseline.package || !baseline.bundles || !baseline.metadata) {
		throw new Error('baseline must be a size report with schemaVersion 1');
	}
	const packageMetrics = ['packedBytes', 'unpackedBytes', 'fileCount'];
	for (const metric of packageMetrics) {
		if (!Number.isFinite(baseline.package[metric]))
			throw new Error(`baseline is missing package metric: ${metric}`);
	}
	for (const category of categories) {
		if (!Number.isFinite(baseline.package.categoryBytes?.[category]))
			throw new Error(`baseline is missing category metric: ${category}`);
	}
	for (const name of bundleNames) {
		for (const metric of ['bytes', 'gzipBytes']) {
			if (!Number.isFinite(baseline.bundles[name]?.[metric]))
				throw new Error(`baseline is missing bundle metric: ${name}.${metric}`);
		}
	}
	return baseline;
}

function getDeltas(current, baseline) {
	const subtract = (a, b) => a - b;
	return {
		package: {
			packedBytes: subtract(current.package.packedBytes, baseline.package.packedBytes),
			unpackedBytes: subtract(current.package.unpackedBytes, baseline.package.unpackedBytes),
			fileCount: subtract(current.package.fileCount, baseline.package.fileCount),
			categoryBytes: Object.fromEntries(
				categories.map((key) => [
					key,
					subtract(current.package.categoryBytes[key], baseline.package.categoryBytes[key]),
				]),
			),
		},
		bundles: Object.fromEntries(
			bundleNames.map((name) => [
				name,
				{
					bytes: subtract(current.bundles[name].bytes, baseline.bundles[name].bytes),
					gzipBytes: subtract(current.bundles[name].gzipBytes, baseline.bundles[name].gzipBytes),
				},
			]),
		),
	};
}

function formatBytes(value) {
	return `${value.toLocaleString('en-US')} B`;
}

function formatMetadata(metadata) {
	return `package ${metadata.packageVersion}, Node ${metadata.nodeVersion}, npm ${metadata.npmVersion}, Webpack ${metadata.webpackVersion}, gzip level ${metadata.gzipLevel}`;
}

function sameTools(a, b) {
	return ['nodeVersion', 'npmVersion', 'webpackVersion', 'gzipLevel'].every((key) => a[key] === b[key]);
}

function printReport(current, baseline, deltas) {
	console.log(`Tools: ${formatMetadata(current.metadata)}`);
	console.log(
		`Package size (npm pack --dry-run): ${formatBytes(current.package.packedBytes)} packed, ${formatBytes(current.package.unpackedBytes)} unpacked, ${current.package.fileCount} files`,
	);
	console.log('\nUnpacked file categories');
	for (const category of categories)
		console.log(`  ${category.padEnd(14)} ${formatBytes(current.package.categoryBytes[category])}`);
	console.log('\nProduction Webpack consumer bundles');
	console.log('  Consumer                Raw          Gzip');
	for (const [name, sizes] of Object.entries(current.bundles)) {
		console.log(`  ${name.padEnd(22)} ${formatBytes(sizes.bytes).padEnd(12)} ${formatBytes(sizes.gzipBytes)}`);
	}
	if (baseline) {
		console.log(`Baseline tools: ${formatMetadata(baseline.metadata)}`);
		if (!sameTools(current.metadata, baseline.metadata)) {
			console.log('Tool versions differ; size deltas may include toolchain changes.');
		}
		console.log('\nDelta from baseline (current - baseline)');
		console.log(`  package packed          ${formatBytes(deltas.package.packedBytes)}`);
		console.log(`  package unpacked        ${formatBytes(deltas.package.unpackedBytes)}`);
		console.log(`  package file count      ${deltas.package.fileCount}`);
		for (const [category, bytes] of Object.entries(deltas.package.categoryBytes)) {
			console.log(`  ${`package ${category}`.padEnd(22)} ${formatBytes(bytes)}`);
		}
		for (const [name, sizes] of Object.entries(deltas.bundles)) {
			console.log(
				`  ${name.padEnd(22)} ${formatBytes(sizes.bytes).padEnd(12)} ${formatBytes(sizes.gzipBytes)} gzip`,
			);
		}
	}
}

async function main() {
	if (
		!fs.existsSync(path.join(distDir, 'esm', 'index.js')) ||
		!fs.existsSync(path.join(distDir, 'umd', 'arabic-services.umd.js'))
	) {
		throw new Error('built artifacts are missing; run npm run build first');
	}

	const args = process.argv.slice(2);
	let json = false;
	let baselinePath;
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === '--json' && !json) json = true;
		else if (args[index].startsWith('--baseline=') && !baselinePath && args[index].length > '--baseline='.length) {
			baselinePath = args[index].slice('--baseline='.length);
		} else if (
			args[index] === '--baseline' &&
			!baselinePath &&
			args[index + 1] &&
			!args[index + 1].startsWith('--')
		) {
			baselinePath = args[index + 1];
			index += 1;
		} else throw new Error('usage: npm run size:report [-- --json] [--baseline <report.json>]');
	}

	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arabic-services-size-'));
	try {
		const current = {
			metadata: {
				packageVersion: packageMetadata.version,
				npmVersion: npmVersion(),
				webpackVersion: webpack.version,
				nodeVersion: process.version,
				gzipLevel: 9,
			},
			package: getPackageReport(),
			bundles: await getBundleReport(tempDir),
		};
		const baseline = baselinePath
			? validateBaseline(JSON.parse(fs.readFileSync(path.resolve(baselinePath), 'utf8')))
			: undefined;
		const deltas = baseline ? getDeltas(current, baseline) : undefined;
		const report = { schemaVersion: 1, current, ...(baseline ? { baseline, deltas } : {}) };
		if (json) console.log(JSON.stringify(report, null, 2));
		else printReport(current, baseline, deltas);
	} finally {
		const tempRoot = path.resolve(os.tmpdir());
		const relative = path.relative(tempRoot, tempDir);
		if (relative && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative)) {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	}
}

main().catch((error) => fail(error.message));
