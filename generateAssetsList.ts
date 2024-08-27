import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const directoryPath = join(import.meta.dir, 'public');

function getFiles(dir: string, filesArr?: string[]) {
	filesArr = filesArr || [];
	const files = readdirSync(dir);
	for (const file of files) {
		const name = join(dir, file);
		if (statSync(name).isDirectory()) {
			getFiles(name, filesArr);
		} else {
			filesArr.push(name.replace(new RegExp(`^${directoryPath}`), '').replace(/\/index\.html$/, '/'));
		}
	}
	return filesArr;
}

const assets = getFiles(directoryPath);
writeFileSync(join(directoryPath, 'assets.json'), JSON.stringify(assets));
