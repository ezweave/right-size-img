import { getFileList } from './getFileList';

import path from 'path';

const fixturePath = path.resolve(
	__dirname,
	'./__fixtures__'
);

describe('getFileList', () => {
	it('gets a list of files with a compatible extension', () => {
		expect(
			getFileList(fixturePath)
		).toMatchSnapshot();
	});
});