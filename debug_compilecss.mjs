const fs = require('fs');
const postcss = require('postcss');
const path = require('path');

function generateVarName(index) {
	return `--color-${index}`;
}

async function processCSS(inputFile, outputFile) {
	try {
		const cssContent = fs.readFileSync(inputFile, 'utf8');

		const root = postcss.parse(cssContent);
		const colorMap = {};
		let colorIndex = 0;

		root.walkDecls((decl) => {
			const { value } = decl;

			const colorRegex = /(?:#(?:[0-9a-fA-F]{3}){1,2}|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:[01]|0?\.\d+))?\s*\)|hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*(?:[01]|0?\.\d+))?\s*\))/g;

			let match;
			while ((match = colorRegex.exec(value)) !== null) {
				const color = match[0];

				// Skip if the color is already replaced
				if (!colorMap[color]) {
					colorMap[color] = generateVarName(colorIndex++);
				}
			}
		});

		const rootRule = postcss.root();
		const rootVars = postcss.rule({ selector: ':root' });

		for (const [color, varName] of Object.entries(colorMap)) {
			rootVars.append({
				prop: varName,
				value: color,
			});
		}

		rootRule.append(rootVars);
		root.append(rootRule);

		root.walkDecls((decl) => {
			const { value } = decl;
			const updatedValue = value.replace(
				/(?:#(?:[0-9a-fA-F]{3}){1,2}|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:[01]|0?\.\d+))?\s*\)|hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*(?:[01]|0?\.\d+))?\s*\))/g,
				(match) => colorMap[match] || match
			);

			decl.value = updatedValue;
		});

		const updatedCSS = root.toString();
		fs.writeFileSync(outputFile, updatedCSS, 'utf8');
		console.log(`Processed CSS saved to ${outputFile}`);
	} catch (error) {
		console.error('Error processing CSS:', error);
	}
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
	console.error('Usage: node debug_compilecss.ejs <inputFile> <outputFile>');
	process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

processCSS(inputPath, outputPath);
