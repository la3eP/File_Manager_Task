import { createReadStream } from 'fs';
import { exist } from './exist.js';
import { pathNormalize } from './pathNormalize.js';

export const cat = async (cDir, destDir) => {
    try {
        const pathToFile = await pathNormalize(cDir, destDir);
        const isFile = (await exist(pathToFile)).isFile;

    if (isFile) {
      const readStream = createReadStream(pathToFile);

      readStream.on('data', (chunk) => {
        console.log(chunk.toString());
      });
      readStream.on('end', () => {
        console.log(`You are currently in ${cDir}`);
      });
    } else {
      console.log('Operation failed');
    }
    } catch (err) {
        console.log('Operation failed');
      }
    };