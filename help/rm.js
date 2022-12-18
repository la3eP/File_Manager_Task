import fs from 'fs/promises';
import { pathNormalize } from './pathNormalize.js';

export const rm = async (cDir, filePath) => {
  try {
    const absolutePath = await pathNormalize(cDir, filePath);
    await fs.rm(absolutePath);
  } catch (err) {
    console.log('Operation failed');
  }
};