import path from 'path';
import { exist } from './exist.js';

export const cd = async (cDir, destDir) => {
  try {
    const opFail = 'Operation failed';

    if (destDir === undefined) {
        console.log(opFail);
        return cDir;
    }

    const isPathAbsolute = path.isAbsolute(destDir);
    let isDirectory = false;
    let relativePath = '';

    if (isPathAbsolute) {
      isDirectory = (await exist(destDir)).isDirectory;
    } else {
      relativePath = path.join(cDir, destDir);
      isDirectory = (await exist(relativePath)).isDirectory;
    }

    if (isDirectory) {
      return isPathAbsolute ? path.normalize(destDir) : path.normalize(relativePath);
    } else {
      console.log(opFail);
      return cDir;
    }
  } catch (err) {
    console.log(opFail);
  }
};