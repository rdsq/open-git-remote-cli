import { execSync } from 'node:child_process';

const regex = /^(\S+)\s+(\S+)/;

export default async function getRemotes(repo: string): Promise<{
    [key: string]: string;
} | null> {
    let output: string;
    try {
        output = execSync('git remote -v', {
            cwd: repo,
        }).toString();
    } catch (err) {
        if (err.message.startsWith('Command failed: git remote -v\nfatal: not a git repository')) {
            console.error('This is not a git repository');
            return null;
        } else if (err.code === 'ENOENT') {
            console.error('Not a directory');
            return null;
        } else throw err;
    }
    const lines = output.split('\n');
    lines.pop(); // remove the last empty line
    const remotes: {
        [key: string]: string;
    }= {};
    for (const line of lines) {
        const parsed = regex.exec(line);
        if (!parsed) throw new Error('unknown git output: ' + line);
        remotes[parsed[1]] = parsed[2];
    }
    return remotes;
}
