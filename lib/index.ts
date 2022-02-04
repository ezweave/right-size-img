import { getFileList } from './getFileList';
import sharp from 'sharp';
import { map } from 'lodash';
import path from 'path';
import { copyFileSync } from 'fs';

export interface ImageResizeArgs {
  pathToFiles: string,
  outputPath?: string,
  maxHeight?: number,
  maxWidth?: number,
  prefix?: string,
}

export interface ResizeAllImagesInDirectory {
  (args: ImageResizeArgs): Promise<Array<string>>
}

export const resizeAllImagesInDirectory: ResizeAllImagesInDirectory = async ({
  maxHeight,
  maxWidth,
  pathToFiles,
  outputPath: desiredOutputPath,
  prefix,
}) => {
  const files = getFileList(pathToFiles);
  const promises = map(files, async (file: string) => {
    const inputPath = path.resolve(
      pathToFiles,
      file
    );
    const outputPath = path.resolve(
      desiredOutputPath || pathToFiles,
      prefix ? `${prefix}${file}` : file
    );
    if(!maxHeight && !maxWidth) {
      throw new Error('Cannot resize without width and height');
    }

    const {
      height: originalHeight,
      width: originalWidth,
    } = await sharp(inputPath).metadata();

    console.warn('ORIGINAL HEIGHT', originalHeight, 'ORIGINAL WIDTH', originalWidth, 'MAX HEIGHT', maxHeight, 'MAX WIDTH', maxWidth);

    // If the image is too small to be resized,
    // sharp will upscale it, but we don't want that
    if(originalWidth < maxWidth) {
      copyFileSync(inputPath, outputPath);
      return `${inputPath} too small for resize, copied to ${outputPath}`;
    } else {
      const {
        height,
        width,
      } = await sharp(
        inputPath
      ).resize(
        maxWidth, 
        maxHeight
      ).toFile(outputPath);
      const originalDimensions = `${originalWidth}x${originalHeight}`;
      const adjustedDimensions = `${width}x${height}`;
      return `${inputPath} converted from ${originalDimensions} to ${adjustedDimensions}, written to ${outputPath}`;
    }
  });
  const results = await Promise.allSettled(promises);

  return map(results, (
    result
  ) => {
   const {
     status
   } = result;
   switch(status) {
     case 'fulfilled':
       return result.value;
     case 'rejected':
       return result.reason;  
   }
  });
};