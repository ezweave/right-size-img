import mkdirp from 'mkdirp';
import path from 'path';
import { rmdirSync } from 'fs';
import { resizeAllImagesInDirectory } from '.';

const fixturePath = path.resolve(
	__dirname,
	'./__fixtures__'
);

const tempDirectoryPath = 'tmp';
let tempDirectory;

describe('resizeAllImagesInDirectory', () => {
	beforeAll(async () => {
		tempDirectory = path.resolve(
			__dirname,
			tempDirectoryPath
		);
		await mkdirp(tempDirectory);
	});
	it('resize all images in a directory', async () => {
		const results = await resizeAllImagesInDirectory({
			maxWidth: 1500,
			pathToFiles: fixturePath,
			outputPath: tempDirectory,
		});
		expect(results).toMatchSnapshot();
	});
	afterAll(() => {
		rmdirSync(tempDirectory, { recursive: true });
	})
});