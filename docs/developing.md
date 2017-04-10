# Developing Remixer

### Setting up your development environment

First you'll need a recent version of [Node.js](https://nodejs.org) to work
with Remixer-js.

Once node is installed, simply clone our repo (or your fork of it) and
run `npm install`.

```bash
git clone git@github.com:material-foundation/material-remixer-js.git
cd material-remixer-js && npm install
```

### Typescript

The source code for Remixer-js is written in
[Typescript](https://www.typescriptlang.org), and compiled to es5 javascript for
distribution.

### Building Remixer

Use any of the following npm scripts to build dev or prod versions of Remixer-js.

```bash
# Builds an unminified version of Remixer-js within the build folder.
npm run build:dev

# Builds a minified version.
npm run build:prod

# Builds both unminified and minified versions.
npm run build
```

### Running the development server

We use [weback dev server](https://webpack.js.org/configuration/dev-server) for
hosting and live-reloading of any code changes.

```bash
npm run dev
open http://localhost:8080
```

### Linting

```bash
# Lint both CSS/LESS using lesshint.
npm run lint:css

# Lint typescript using tslint.
npm run lint:ts

# Lints both css and ts.
npm run lint
```

### Testing and Code Coverage

Testing uses the [karma](https://karma-runner.github.io) test runner with
[mocha](https://mochajs.org/) flavored testing framework. Code coverage
is reported by [istanbul](https://www.npmjs.com/package/istanbul-instrumenter-loader).

```bash
# Run tests and code coverage once.
npm run test

# Run with auto-watch indefinitely.
npm run test:watch
```
