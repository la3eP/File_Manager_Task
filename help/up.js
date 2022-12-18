import path from 'path';

export const up = async (cDir, root) => {
    if (root == cDir)
        return cDir;
    let stepBack=path.join(cDir,'..');
    return stepBack;
};