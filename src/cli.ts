export default function(argv: string[]): {
    path: string | null;
    remote: string | null;
    help: boolean;
    version: boolean;
} {
    const isHelp = argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1;
    const isVersion = argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1;
    return {
        path: argv[0] ?? null,
        remote: argv[1] ?? null,
        help: isHelp,
        version: isVersion,
    };
}
