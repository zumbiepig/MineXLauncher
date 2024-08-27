import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const directoryPath = join(import.meta.dir, 'public');

function getFiles(directory: string, filesArr?: string[]) {
	filesArr = filesArr || [];
	const files = readdirSync(directory);
	for (const file of files) {
		const name = join(directory, file);
		if (statSync(name).isDirectory()) {
			getFiles(name, filesArr);
		} else {
			filesArr.push(name.replace(new RegExp(`^${directoryPath}`), '').replace(/\/index\.html$/, '/'));
		}
	}
	return filesArr;
}

writeFileSync(join(directoryPath, 'assets.json'), JSON.stringify(getFiles(directoryPath)));
