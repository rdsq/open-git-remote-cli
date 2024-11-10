export default function(argv: string[]): {
    path: string | null;
    remote: string | null;
    help: boolean;
} {
    const isHelp = argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1;
    return {
        path: argv[0] ?? null,
        remote: argv[1] ?? null,
        help: isHelp,
    };
}
