import { readdir } from 'node:fs/promises';
import { exit } from 'node:process';

export default async function checkDir(dir: string): Promise<void | never> {
    try {
        const items = await readdir(dir);
        if (items.indexOf('.git') === -1) {
            console.error('Not a git repository');
            exit(1);
        }
    } catch (err) {
        const code: string | undefined = err.code;
        if (code === 'ENOENT') {
            console.error('No such directory');
            exit(1);
        } else if (code === 'ENOTDIR') {
            console.error('Not a directory');
            exit(1);
        } else throw err;
    }
}
