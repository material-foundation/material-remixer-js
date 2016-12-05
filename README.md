![remixer](https://cdn.rawgit.com/material-foundation/material-remixer-web/develop/docs/assets/lockup_remixer_for_web.svg)

[![Build Status](https://travis-ci.org/material-foundation/material-remixer-web.svg?branch=develop)](https://travis-ci.org/material-foundation/material-remixer-web) [![codecov](https://codecov.io/gh/material-foundation/material-remixer-web/branch/develop/graph/badge.svg)](https://codecov.io/gh/material-foundation/material-remixer-web) [![npm version](https://badge.fury.io/js/material-remixer.svg)](https://badge.fury.io/js/material-remixer)

Remixer helps teams use and refine design specs by providing an abstraction for these values that is accessible and configurable from both inside and outside the app itself.

This SDK for Web is currently in development.

**New to Remixer?** Visit our [main repo](https://github.com/material-foundation/material-remixer) to get a full description of what it is and how it works.
- - -

## Quickstart

### 1. Use [`npm`](https://www.npmjs.com/) to install as dependency.

`npm install material-remixer --save`

This will install the Remixer files in your project's `node_modules` folder.

### 2. Include the `remixer.js` script in your app.

```html
<script src="./node_modules/material-remixer/dist/remixer.js"></script>
```

### 3. Begin by starting Remixer.

```javascript
remixer.start();
```

### 4. Add variables.
Now you can add any desired variables and use the callback method to assign the `selectedValue` property.

```javascript
// Add a boolean variable to generate a toggle switch in the overlay.
remixer.addBooleanVariable("show", true, function(variable) {
  document.getElementById("box").style.display = variable.selectedValue ? "block" : "none";
});
```

## Example App

- [Web example app](examples)

## State of development

Visit our [State of Development](https://github.com/material-foundation/material-remixer/wiki/State-of-Development) wiki for the current roadmap and status of development for each platform.

## Other Repositories

The main Remixer GitHub repo for documentation, project tracking, and general information:
- [Remixer docs](https://github.com/material-foundation/material-remixer)

Other platform specific libraries and tools can be found in the following GitHub repos:

- [iOS](https://github.com/material-foundation/material-remixer-ios) - Remixer for iOS.
- [Android](https://github.com/material-foundation/material-remixer-android) - Remixer for Android.
- Web Remote - Remixer web remote controller for all platforms (available soon).

## Is material-foundation affiliated with Google?

Yes, the [material-foundation](https://github.com/material-foundation) organization is one of Google's new homes for tools and frameworks related to our [Material Design](https://material.io) system. Please check out our blog post [Design is Never Done](https://design.google.com/articles/design-is-never-done/) for more information regarding Material Design and how Remixer integrates with the system.

## Contributing

We gladly welcome contributions! If you have found a bug, have questions, or wish to contribute, please follow our [Contributing Guidelines](https://github.com/material-foundation/material-remixer-web/blob/develop/CONTRIBUTING.md).

## License

© Google, 2016. Licensed under an [Apache-2](https://github.com/material-foundation/material-remixer-web/blob/develop/LICENSE) license.
