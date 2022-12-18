import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { exist } from './exist.js';
import { pathNormalize } from './pathNormalize.js';
import { finished, pipeline } from 'stream';
import path from 'path';

export const compress = async (cDir, filePath, fileDest) => {
  try {
    if (!fileDest && !filePath) {
      console.log('Operation failed');
      return;
    }
    const fileName = path.parse(filePath).name;
    const destPath = path.join(fileDest, fileName + '.br');
    const pathIn = await pathNormalize(cDir, filePath);
    const pathOut = await pathNormalize(cDir, destPath);
    const isFileExist = await exist(pathIn);

    if (isFileExist.isFile || isFileExist.isDirectory) {
      const int = createReadStream(pathIn);
      const out = createWriteStream(pathOut);
      const brotli = zlib.createBrotliCompress();

      pipeline(int, brotli, out, (err) => {
        if (err) {
          console.log('Operation failed');
        }
      });

      finished(out, (err) => {
        if (!err) {
          console.log('Done');
          console.log(`You are currently in ${cDir}`);
        }
      });
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};