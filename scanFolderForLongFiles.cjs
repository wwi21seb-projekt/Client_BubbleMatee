const fs = require('fs').promises;
const path = require('path');

async function countLines(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
	const lines = content.split('\n');
	return lines.length;
}

async function processFilesInFolder(folderPath, abortAt200Lines, excludedFolder) {
	try {
		const files = await fs.readdir(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			const stats = await fs.stat(filePath);

			if (stats.isFile()) {
				const lineCount = await countLines(filePath);

				if (lineCount > 200) {
					console.log(`${filePath} - Lines: ${lineCount}`);

					if (abortAt200Lines) {
						console.error('Aborted processing files due to line limit.');
						process.exit(1);
					}
				}
			} else if (stats.isDirectory()) {
				const normalizedExcludedFolder = path.normalize(excludedFolder);
				const normalizedFilePath = path.normalize(filePath);

				if (normalizedFilePath !== normalizedExcludedFolder) {
					await processFilesInFolder(normalizedFilePath, abortAt200Lines, normalizedExcludedFolder);
				} else {
					console.log(`Skipping Folder: ${normalizedFilePath}`);
				}
			}
		}
	} catch (error) {
		console.error(`Error reading folder: ${folderPath}`, error);
	}
}

async function main(folderPath, abortAt200Lines, excludedFolder) {
	const normalizedFolderPath = path.normalize(folderPath);
	await processFilesInFolder(normalizedFolderPath, abortAt200Lines, excludedFolder);
	console.log('Done processing files.');
}

// Use Cli-Arguments to configure the script
const folderPath = './src';
const abortAt200Lines = process.argv.includes('--abort-at-200-lines');
const excludedFolder = 'src/images';

// Start the script
main(folderPath, abortAt200Lines, excludedFolder);
