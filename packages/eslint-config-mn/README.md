# eslint-config-mn

[![npm version](https://badge.fury.io/js/eslint-config-mn.svg)](http://badge.fury.io/js/eslint-config-mn)

This package provides mn's .eslintrc as an extensible shared config.

## Usage

We export three ESLint configurations for your usage.

### eslint-config-mn

Our default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires `eslint`, `eslint-plugin-import`, `eslint-plugin-react`, and `eslint-plugin-jsx-a11y`. If you don't need React, see [eslint-config-mn-base](https://npmjs.com/eslint-config-mn-base).

If you use yarn, run `yarn add --dev eslint-config-mn-base eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y`, and see below for npm instructions.

1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "eslint-config-mn@latest" peerDependencies
  ```

  Linux/OSX users can run

  ```sh
  (
    export PKG=eslint-config-mn;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  Which produces and runs a command like:

  ```sh
  npm install --save-dev eslint-config-mn eslint@^#.#.# eslint-plugin-jsx-a11y@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-react@^#.#.#
  ```

  Windows users can either install all the peer dependencies manually, or use the [install-peerdeps](https://github.com/nathanhleung/install-peerdeps) cli tool.

  ```sh
  npm install -g install-peerdeps
  install-peerdeps --dev eslint-config-mn
  ```

  The cli will produce and run a command like:

  ```sh
  npm install --save-dev eslint-config-mn eslint@^#.#.# eslint-plugin-jsx-a11y@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-react@^#.#.#
  ```

2. Add `"extends": "mn"` to your .eslintrc

### eslint-config-mn/base

This entry point is deprecated. See [eslint-config-mn-base](https://npmjs.com/eslint-config-mn-base).

### eslint-config-mn/legacy

This entry point is deprecated. See [eslint-config-mn-base](https://npmjs.com/eslint-config-mn-base).

See [mn's Javascript styleguide](https://github.com/mn/javascript) and
the [ESlint config docs](http://eslint.org/docs/user-guide/configuring#extending-configuration-files)
for more information.

## Improving this config

Consider adding test cases if you're making complicated rules changes, like anything involving regexes. Perhaps in a distant future, we could use literate programming to structure our README as test cases for our .eslintrc?

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.
