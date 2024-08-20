import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const directoryPath = join(import.meta.dirname, 'public');

function getFiles(dir, files_) {
	files_ = files_ || [];
	const files = readdirSync(dir);
	for (let i in files) {
		const name = dir + '/' + files[i];
		if (statSync(name).isDirectory()) {
			getFiles(name, files_);
		} else {
			files_.push(name.replace(`${import.meta.dirname}/public`, '').replace('/index.html', '/'));
		}
	}
	return files_;
}

const assets = getFiles(directoryPath);
writeFileSync(join(import.meta.dirname, '/public/assets.json'), JSON.stringify(assets, null, 2));
