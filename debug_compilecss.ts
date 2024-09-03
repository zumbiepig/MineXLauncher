import fs from 'fs';
import postcss from 'postcss';
import path from 'path';

// @ts-expect-error
function generateVarName(selector, property) {
	const cleanedSelector = selector.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
	const cleanedProperty = property.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
	return `--${cleanedSelector}-${cleanedProperty}`;
}

// @ts-expect-error
function extractColors(cssContent) {
	const colorRegex = /(?:#[0-9a-fA-F]{3,6}|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*\d*\.*\d+)?\s*\)|hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*\d*\.*\d+)?\s*\))/g;
	const colors = new Set();
	let match;

	while ((match = colorRegex.exec(cssContent)) !== null) {
		colors.add(match[0]);
	}

	return Array.from(colors);
}

// @ts-expect-error
async function processCSS(inputFile, outputFile) {
	try {
		const cssContent = fs.readFileSync(inputFile, 'utf8');
		const root = postcss.parse(cssContent);

		const colorMap = {};
		const colors = extractColors(cssContent);

		const rootVars = postcss.rule({ selector: ':root' });

		const propertyColorMap = new Map();

		root.walkRules((rule) => {
			const selector = rule.selector;

			rule.walkDecls((decl) => {
				if (decl.value && colors.includes(decl.value.trim())) {
					const color = decl.value.trim();
					const propertyName = decl.prop;
					const varName = generateVarName(selector, propertyName);

					// @ts-expect-error
					if (!colorMap[color]) {
						// @ts-expect-error
						colorMap[color] = varName;
						rootVars.append({
							prop: varName,
							value: color,
						});
					}

					if (!propertyColorMap.has(decl.prop)) {
						propertyColorMap.set(decl.prop, new Map());
					}
					// @ts-expect-error
					propertyColorMap.get(decl.prop).set(color, `var(${colorMap[color]})`);
				}
			});
		});

		root.prepend(rootVars);

		root.walkDecls((decl) => {
			const { value } = decl;
			let updatedValue = value;

			if (propertyColorMap.has(decl.prop)) {
				const colorVars = propertyColorMap.get(decl.prop);
				Object.keys(colorVars).forEach((color) => {
					updatedValue = updatedValue.replace(new RegExp(color, 'g'), colorVars[color]);
				});
			}

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
	console.error(`Usage: bun run ./${import.meta.file} <inputFile> <outputFile>`);
	process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

processCSS(inputPath, outputPath);
