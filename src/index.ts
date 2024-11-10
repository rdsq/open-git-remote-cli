import cliParser from './cli.js';
import helpMessage from './help.js';
import * as process from 'node:process';

const argv = process.argv.slice(2);

const parsed = cliParser(argv);

if (parsed.help) {
    console.log(helpMessage);
    process.exit(0);
}
