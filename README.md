![remixer](https://cdn.rawgit.com/material-foundation/material-remixer/master/docs/assets/lockup_remixer_icon_horizontal_dark_small.svg)

Remixer helps teams use and refine design specs by providing an abstraction for these values that is accessible and configurable from both inside and outside the app itself.

This SDK for Web is currently in development.

**New to Remixer?** Visit our [main repo](https://github.com/material-foundation/material-remixer) to get a full description of what it is and how it works.
- - -

## Quickstart

### 1. Use [`npm`](https://www.npmjs.com/) or [`yarn`](https://yarnpkg.com/) to install dependencies.

```bash
npm install
```

### 2. Include the `remixer.js` script in your app.

```html
<head>
  <script src="../dist/remixer.js"></script>
</head>
```

### 3. Begin by starting Remixer

```javascript
remixer.start();
```

### 4. Add variables
Now you can add any desired variables and use the callback method to assign the `selectedValue` property.

```javascript
// Add a boolean variable to generate a toggle switch in the overlay.
remixer.addBooleanVariable("show", true, function(variable) {
  document.getElementById("box").style.display = variable.selectedValue ? "block" : "none";
});
```

## Example App

- [Web example app](examples/index.html)

## Other Repositories

Other platform specific libraries and tools can be found in the following GitHub repos:

- [iOS](https://github.com/material-foundation/material-remixer-ios) - Remixer for iOS.
- [Android](https://github.com/material-foundation/material-remixer-android) - Remixer for Android.
- Dashboard - Remixer web dashboard for all platforms (available soon).
