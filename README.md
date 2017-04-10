# <img align="center" src="https://cdn.rawgit.com/material-foundation/material-remixer-js/develop/docs/assets/remixer_logo_32x32.png"> Remixer for JavaScript

<img align="right" src="https://cdn.rawgit.com/material-foundation/material-remixer-js/develop/docs/assets/app_screenshot.png" width="339px">

[![Build Status](https://travis-ci.org/material-foundation/material-remixer-js.svg?branch=develop)](https://travis-ci.org/material-foundation/material-remixer-js) [![codecov](https://codecov.io/gh/material-foundation/material-remixer-js/branch/develop/graph/badge.svg)](https://codecov.io/gh/material-foundation/material-remixer-js) [![npm version](https://badge.fury.io/js/material-remixer.svg)](https://badge.fury.io/js/material-remixer)

Remixer is a framework to iterate quickly on UI changes by allowing you to adjust UI variables without needing to rebuild (or even restart) your app. You can adjust Numbers, Colors, Booleans, and Strings. To see it in action check out the [example app](https://github.com/material-foundation/material-remixer-js/tree/develop/examples).

If you are interested in using Remixer in another platform, you may want to check out the [iOS](https://github.com/material-foundation/material-remixer-ios) and [Android](https://github.com/material-foundation/material-remixer-android) repos. With any of the three platforms you can use the [Remote Controller](https://github.com/material-foundation/material-remixer-remote-web) to change the variables from a web dashboard.

## Using Remixer in your app

#### 1. Use [`npm`](https://www.npmjs.com/) to install as dependency.

`npm install material-remixer --save`

This will install the Remixer files in your project's `node_modules` folder.

#### 2. Include the `remixer.js` script in your app.

```html
<script src="./node_modules/material-remixer/dist/remixer.js"></script>
```

#### 3. Begin by starting Remixer.

```javascript
remixer.start();
```

#### 4. (Optional) Configure the Web Remote Controller

This **optional** step is only needed if you wish to use the Web Remote Controller. If so, follow these guidelines:

  - Set up a new or existing [Firebase](https://firebase.google.com/) account as detailed in the [Web Remote Controller](https://github.com/material-foundation/material-remixer-remote-web) repository.
  - Add your Firebase account credentials to your app, and forward the param to the `remixer.start()` method.
  
    ```javascript
    // Replace with your project's Firebase info.
    var config = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    };

    // Pass the config params to Remixer start method.
    remixer.start(config);
    ```

  - You can then toggle on/off sharing to the remote controller from within the Remixer overlay.

#### 5. Add variables.
Now you can add any desired variables and use the callback method to assign the `selectedValue` property.

```javascript
// Add a boolean variable to generate a toggle switch in the overlay.
remixer.addBooleanVariable("show", true, function(variable) {
  document.getElementById("box").style.display = variable.selectedValue ? "block" : "none";
});
```

## API Documentation

- Use these [common static methods](https://github.com/material-foundation/material-remixer-js/blob/develop/docs/remixer-api.md) to enable Remixer in your app.
- Or refer to the full [API documentation](https://material-foundation.github.io/material-remixer-js/docs) for more information.

## Contributing to Remixer

We're excited you want to contribute to the project! Please read these docs so we can get your contributions submitted quickly.

- [Contribution policy and guidelines](https://github.com/material-foundation/material-remixer-js/blob/develop/CONTRIBUTING.md)
- [Developing Remixer](https://github.com/material-foundation/material-remixer-js/blob/develop/docs/developing.md)

## Is material-foundation affiliated with Google?

Yes, the [material-foundation](https://github.com/material-foundation) organization is one of Google's new homes for tools and frameworks related to our [Material Design](https://material.io) system. Please check out our blog post [Design is Never Done](https://design.google.com/articles/design-is-never-done/) for more information regarding Material Design and how Remixer integrates with the system.

## License

© Google, 2016. Licensed under an [Apache-2](https://github.com/material-foundation/material-remixer-js/blob/develop/LICENSE) license.
