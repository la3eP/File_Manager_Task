import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'process';
import os from 'os';
import { args, up, cd, ls, cat, add, rn, cp, mv, rm, osInfo, hash, compress, decompress } from './help/index.js';

const rl = readline.createInterface({ input: stdin, output: stdout });
let userName = 'anonymous';
let cDir = os.homedir();
const root = os.homedir();

function currDir() {
    console.log(`You are currently in ${cDir}`);
  };

function begin() {
    const userArgs = args();
  
    for (const item of userArgs) {
      if (Object.hasOwn(item, 'username')) {
        userName = item.username;
      }
    }
    console.log(`Welcome to the File Manager, ${userName}!`);
    currDir();
  };
  
  begin();

  

const index = async () => {
    rl.on('line', async (answer) => {
      const args = answer.split(' ');
  
      switch (args[0]) {
        case 'up':
          cDir = await up(cDir, root);
          currDir();
        break;

        case 'cd':
          cDir = await cd(cDir, args[1]);
          currDir();
        break;

        case 'ls':
          await ls(cDir);
          currDir();
        break;

        case 'cat':
          await cat(cDir, args[1]);
        break;

        case 'add':
          await add(cDir, args[1]);
          currDir();
        break;

        case 'rn':
          await rn(cDir, args[1], args[2]);
          currDir();
        break;

        case 'cp':
          await cp(cDir, args[1], args[2]);
          currDir();
          break;

        case 'mv':
          await mv(cDir, args[1], args[2]);
          currDir();
        break;

        case 'rm':
          await rm(cDir, args[1]);
          currDir();
        break;

        case 'os':
          await osInfo(args[1]);
          currDir();
        break;

        case 'hash':
          await hash(cDir, args[1]);
        break;

        case 'compress':
          await compress(cDir, args[1], args[2]);
        break;

        case 'decompress':
          await decompress(cDir, args[1], args[2]);
          currDir();
        break;

        case '.exit':
          process.exit(0);

        default:
          console.log('Invalid input');
          currDir();
        break;
      }
    });
};

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });

  //catches ctrl+c event
process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});

index();
  