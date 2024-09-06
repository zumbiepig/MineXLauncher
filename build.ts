import { $, build } from 'bun';
import { mkdirSync, readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import chalk from 'chalk';
import { minify } from 'html-minifier';

function getFiles(baseDir: string, dir?: string, filesArr?: string[]) {
	dir = dir ?? baseDir;
	filesArr = filesArr ?? [];
	const files = readdirSync(dir);
	for (const file of files) {
		const name = resolve(dir, file);
		if (statSync(name).isDirectory()) {
			getFiles(baseDir, name, filesArr);
		} else {
			filesArr.push(name);
		}
	}
	return filesArr;
}

console.clear();

const srcDir = resolve(import.meta.dir, 'src');
const publicDir = resolve(import.meta.dir, 'public');
const srcFilesArr = getFiles(resolve(import.meta.dir, 'src'));

console.log(chalk.cyan('Linting code...\n'));
//const lintOutput = await $`bunx eslint ./src/`.nothrow().text();
//if (lintOutput) {
//	console.error(lintOutput);
//	process.exit(1);
//}

console.log(chalk.cyan('Type-checking code...\n'));
//const tscOutput = await $`bunx tsc`.nothrow().text();
//if (tscOutput) {
//	console.error(tscOutput);
//	process.exit(1);
//}

console.log(chalk.cyan('Removing old build artifacts...\n'));
await $`rm -rf ./public/resources/scripts/ ./public/resources/data/assets.json ./public/sw.js ./public/sw-full.js`.quiet();

console.log(chalk.cyan('Bundling TypeScript and modules...\n'));
await build({
	entrypoints: srcFilesArr.filter((file) => file.endsWith('.ts')),
	outdir: './public/',
	target: 'browser',
	root: './src/',
	minify: {
		syntax: true,
		whitespace: true,
		identifiers: false,
	},
});

console.log(chalk.cyan('Minifying HTML and CSS...\n'));
srcFilesArr
	.filter((file) => !file.endsWith('.ts'))
	.forEach((file) => {
		const outputPath = file.replace(new RegExp(`^${srcDir}`), publicDir);
		mkdirSync(dirname(outputPath), { recursive: true });
		writeFileSync(
			outputPath,
			minify(readFileSync(file, 'utf-8'), {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			})
		);
	});

console.log(chalk.cyan('Obfuscating JavaScript...\n'));
await $`bunx javascript-obfuscator ./public/resources/scripts/ --output ./public/resources/scripts/ --options-preset high-obfuscation`.quiet();

console.log(chalk.cyan('Generating assets list...\n'));
writeFileSync(
	resolve(publicDir, 'resources/data/assets.json'),
	JSON.stringify(
		getFiles(publicDir).map((asset) => {
			return asset.replace(new RegExp(`^${publicDir}`), '').replace(/\/index\.html$/, '/');
		})
	)
);

console.log(chalk.green('Build complete!\n'));
