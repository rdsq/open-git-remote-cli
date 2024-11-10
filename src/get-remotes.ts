import { execSync } from 'node:child_process';

const regex = /^(\S+)\s+(\S+)/;

export default async function getRemotes(repo: string): Promise<{
    [key: string]: string;
}> {
    const output: string = execSync('git remote -v', {
        cwd: repo,
    }).toString();
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
