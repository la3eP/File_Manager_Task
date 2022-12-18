import fs from 'fs/promises';
import path from 'path';
import { pathNormalize } from './pathNormalize.js';

export const rn = async (cDir, userPathToFile, newFilename) => {
  try {
    if (!newFilename) {
      console.log('File name is empty');
      return;
    }
    const pathToFile = await pathNormalize(cDir, userPathToFile);
    const dirToFileRename = path.parse(pathToFile).dir;
    const response = await fs.rename(pathToFile, path.join(dirToFileRename, newFilename));

    if (!response) {
      console.log('File renamed successfully');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No such file or directory');
    }
    console.log('Operation failed');
  }
};