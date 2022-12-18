import fs from 'fs/promises';
import path from 'path';

export const add = async (cDir, filename) => {
  try {
    const response = await fs.writeFile(path.join(cDir, filename), '', { flag: 'wx' });

    if (response === undefined) {
      console.log(`File was created with name ${filename}`);
    }
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('File already exists');
    }
  }
};