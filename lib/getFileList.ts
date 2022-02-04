import { readdirSync } from 'fs';

export interface GetFileList {
	(path: string): Array<string> 
}

export const getFileList: GetFileList = (
	path
) => {
	const files = readdirSync(path);
	return files;
};