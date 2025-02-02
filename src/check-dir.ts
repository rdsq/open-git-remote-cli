import { execSync } from 'node:child_process';
import { exit } from 'node:process';

export default async function checkDir(dir: string): Promise<void | never> {
    try {
        execSync('git rev-parse --is-inside-work-tree', { cwd: dir });
    } catch (err) {
        const code: string | undefined = err.code;
        if (code === 'ENOENT') {
            console.error('No such directory');
        } else if (code === 'ENOTDIR') {
            console.error('Not a directory');
        }
        // if it is a git error, it has already printed an error
        exit(1);
    }
}
