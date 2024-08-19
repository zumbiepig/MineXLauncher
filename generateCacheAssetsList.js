import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const directoryPath = join(import.meta.dirname, 'public'); // Adjust the path to your assets folder

function getFiles(dir, files_) {
	files_ = files_ || [];
	const files = readdirSync(dir);
	for (let i in files) {
		const name = dir + '/' + files[i];
		if (statSync(name).isDirectory()) {
			getFiles(name, files_);
		} else {
			files_.push(name.replace(`${import.meta.dirname}/public`, '')); // Adjust the path to match your public folder
		}
	}
	return files_;
}

const cacheAssets = getFiles(directoryPath);
writeFileSync(join(import.meta.dirname, '/public/cacheAssets.json'), JSON.stringify(cacheAssets, null, 2));
