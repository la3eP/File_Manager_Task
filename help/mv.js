import fs from 'fs/promises';
import path from 'path';
import { pathNormalize } from './pathNormalize.js';

export const mv = async (cDir, oldPath, newPath) => {
  try {
    const filename = path.parse(oldPath).base;
    const pathToDirectory = path.join(newPath, filename);
    const pathFrom = await pathNormalize(cDir, oldPath);
    const pathTo = await pathNormalize(cDir, pathToDirectory);

    await fs.rename(pathFrom, pathTo);
  } catch (err) {
    console.log('Operation failed');
  }
};