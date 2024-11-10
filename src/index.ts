#!/usr/bin/enc node
import cliParser from './cli.js';
import helpMessage from './help.js';
import * as process from 'node:process';
import * as fs from 'node:fs/promises';
import path from 'node:path';

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
