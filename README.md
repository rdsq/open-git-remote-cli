# Open Git Remote CLI

Open Git Remote is a CLI that opens git remotes in the browser (obviously)

## Installation

Install [it](https://www.npmjs.com/package/open-git-remote) using npm

```sh
npm i -g open-git-remote
```

Or from source

```sh
git clone https://github.com/rdsq/open-git-remote-cli.git
cd open-git-remote-cli
npm i . -g
```

## Usage

Open the current repo remote

```sh
open-git-remote
```

Open remote from a dir

```sh
open-git-remote ./my-repo
```

Open specific remote

```sh
open-git-remote . origin
```