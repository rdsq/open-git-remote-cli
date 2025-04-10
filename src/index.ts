#!/usr/bin/env node
import cliParser from './cli.js';
import helpMessage from './help.js';
import * as process from 'node:process';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import getRemotes from './get-remotes.js';
import open from './open/mod.js';
import select from '@inquirer/select';
import { ExitPromptError } from '@inquirer/core';
import checkDir from './check-dir.js';

const argv = process.argv.slice(2);

const parsed = cliParser(argv);

if (parsed.help) {
    console.log(helpMessage);
    process.exit(0);
}

if (parsed.version) {
    const packageFilePath = path.join(import.meta.dirname, '../package.json');
    const packageFileText = await fs.readFile(packageFilePath, 'utf-8');
    const packageFile = JSON.parse(packageFileText);
    console.log(packageFile.version);
    process.exit(0);
}

let target = process.cwd();

if (parsed.path) {
    target = path.join(target, parsed.path);
}

await checkDir(target);
// check if it is a dir and git repo

const remotes = await getRemotes(target);

if (Object.keys(remotes).length === 0) {
    console.error('This repository has no remotes');
    process.exit(1);
}

if (parsed.remote) {
    if (!(parsed.remote in remotes)) {
        const available = Object.keys(remotes).join(', ');
        console.error(`No remote called "${parsed.remote}" in this repository`);
        console.error('Available remotes: ' + available);
        process.exit(1);
    }
    await open(remotes[parsed.remote]);
    process.exit(0);
}

if (Object.keys(remotes).length === 1) {
    const url = Object.values(remotes)[0];
    await open(url);
    process.exit(0);
}

// multiple remotes
const choices = [];

for (const [name, url] of Object.entries(remotes)) {
    choices.push({
        name,
        value: url,
        description: url,
    });
}

try {
    const choice = await select({
        message: 'Pick the remote to open',
        choices,
    }) as string;
    await open(choice);
} catch (err) {
    if (err instanceof ExitPromptError) {
        process.exit(0);
    } else throw err;
}
