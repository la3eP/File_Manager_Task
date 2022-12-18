import { createReadStream } from 'fs';
import crypto from 'crypto';
import { pathNormalize } from './pathNormalize.js';
import { exist } from './exist.js';

export const hash = async (cDir, userPath) => {
  try {
    const pathToFile = await pathNormalize(cDir, userPath);
    const isFile = (await exist(pathToFile)).isFile;

    if (userPath && isFile) {
      let content = '';
      const readStream = createReadStream(pathToFile);

      const hash = crypto.createHash('sha256');
      readStream.on('data', (chunk) => {
        content += chunk.toString();
      });

      readStream.on('end', () => {
        hash.update(content);
        const hashString = hash.digest('hex');
        console.log(hashString);
        console.log(`You are currently in ${cDir}`);
      });
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};