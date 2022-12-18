import fs from 'fs/promises';
import { pathNormalize } from './pathNormalize.js';
import path from 'path';

export const cp = async (cDir, oldPath, newPath) => {
  try {
    const filename = path.parse(oldPath).base;
    const pathToDirectory = path.join(newPath, filename);
    const pathFrom = await pathNormalize(cDir, oldPath);
    const pathTo = await pathNormalize(cDir, pathToDirectory);

    await fs.cp(pathFrom, pathTo, { recursive: true });
  } catch (err) {
    console.log('Operation failed');
  }
};