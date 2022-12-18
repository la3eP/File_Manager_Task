import fs from 'fs/promises';

export const ls = async (cDir) => {
  try {
    const arr = await fs.readdir(cDir, {withFileTypes: true});
    const sortedDir = [];
    const sortedFiles = [];
    let i = 0;
    let z = 0;
    arr.forEach((result) => {
      if (result.isDirectory() === true) {
        sortedDir[z] = {
          Name:result.name , Type:'directory' };
          z++;
      };
      if (result.isFile() === true) {
        sortedFiles[i] = {
          Name:result.name, Type:'file'};
          i++;
      };
    });
    const sortedArr = [].concat(sortedDir, sortedFiles);
    sortedArr.sort((a, b) => a.Name < b.Name);
    console.table(sortedArr);
  } catch (err) {
    console.log('Operation failed');
  }
};