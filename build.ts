import { $, build } from 'bun';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

function getFiles(baseDir: string, dir?: string, filesArr?: string[]) {
	dir = dir || baseDir;
	filesArr = filesArr || [];
	const files = readdirSync(dir);
	for (const file of files) {
		const name = join(dir, file);
		if (statSync(name).isDirectory()) {
			getFiles(baseDir, name, filesArr);
		} else {
			filesArr.push(name);
		}
	}
	return filesArr;
}

console.log(chalk.cyan('Linting code...\n'));
const lintOutput = await $`bunx eslint ./src/`.nothrow().text();
if (lintOutput) {
	console.error(lintOutput);
	process.exit(1);
}

console.log(chalk.cyan('Removing old build artifacts...\n'));
await $`rm -rf ./public/resources/scripts/ ./public/assets.json ./public/sw.js ./public/sw-full.js`.quiet();

console.log(chalk.cyan('Bundling TypeScript and modules...\n'));
const srcFilesArr = getFiles(join(import.meta.dir, 'src'));
await build({
	entrypoints: srcFilesArr,
	outdir: './public/',
	root: './src/',
	minify: {
		syntax: true,
		whitespace: true,
		identifiers: false,
	},
});

console.log(chalk.cyan('Obfuscating JavaScript...\n'));
await $`bunx javascript-obfuscator ./public/resources/scripts/ --output ./public/resources/scripts/ --options-preset high-obfuscation`.quiet();

console.log(chalk.cyan('Generating assets list...\n'));
const publicDir = join(import.meta.dir, 'public');
writeFileSync(
	join(publicDir, 'assets.json'),
	JSON.stringify(getFiles(publicDir))
		.replace(new RegExp(`^${publicDir}`), '')
		.replace(/\/index\.html$/, '/')
);

console.log(chalk.green('Build complete!\n'));
