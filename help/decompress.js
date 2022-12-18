import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { pathNormalize } from './pathNormalize.js';
import zlib from 'zlib';

export const decompress = async (cDir, filePath, fileDest) => {
  try {
    const pathIn = await pathNormalize(cDir, filePath);
    const pathOut = await pathNormalize(cDir, fileDest);

    const int = createReadStream(pathIn);
    const out = createWriteStream(pathOut);
    const brotli = zlib.createBrotliDecompress();

    pipeline(int, brotli, out, (err) => {
      if (err) {
        console.log('Operation failed');
      }
    });
  } catch (err) {
    console.log('Operation failed');
  }
};