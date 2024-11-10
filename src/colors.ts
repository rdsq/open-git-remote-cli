export function escStart(text: string, code: string | number): string {
    return `\x1b[${code}m` + text;
}

export function esc(text: string, code: string | number): string {
    return escStart(text, code) + '\x1b[0m';
}
