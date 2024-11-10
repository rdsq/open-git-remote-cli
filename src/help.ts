import { esc, escStart } from './colors.js';

export default `Open git remote URLs in the browser

${esc('Usage: open-git-remote ' + escStart('[path] [remote]', 2), 34)}

Arguments:
  ${esc('path ' + escStart('(./ default)', 2), 36)}
    Specify the path to the git repository
  ${esc('remote ' + escStart('(pick by default)', 2), 36)}
    Specify the remote name to open`;
