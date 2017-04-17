## 1.0.1

Adds license blocks to tests.

## 1.0.0

Remixer v1.0.0 Release.

## 0.7.0

### New Features

* [Updates to latest dependencies.](https://github.com/material-foundation/material-remixer-js/commit/939b781618071ccac2da844d46cfbc742ad1df5a)
* [Adds return value to remixer.cloneAndUpdateVariable(). Adds tests.](https://github.com/material-foundation/material-remixer-js/commit/673bc718305a5e94aba3a838dfdef26a435d830d)
* [Updates from mdl-list to flexbox for display of variable controls.](https://github.com/material-foundation/material-remixer-js/commit/540a1a6ee9bea212a1d6b9e60d953722ad539236)
* [Updates share menu to flexbox.](https://github.com/material-foundation/material-remixer-js/commit/ea7811b89392caa78e514d2ba87d08b3dc3388db)

## 0.6.4

### Bug Fixes

* [Shows share menu only if firebase has been initialized properly.](https://github.com/material-foundation/material-remixer-js/commit/8ef2372332dba476f859652d1d7437cbcd103bc0)
* [Requires remote to be initialized when checking if enabled.](https://github.com/material-foundation/material-remixer-js/commit/6612a2fddf1c50e42131ac09e10878cc6de7e620)
* [Fixes color formatting bug.](https://github.com/material-foundation/material-remixer-js/commit/fe62f83238d94ec1f26b7b4d550c0b2ff1be655d)

## 0.6.0

### Bug Fixes

* [Fixes colorVariable bug when changed remotely.](https://github.com/material-foundation/material-remixer-js/commit/3aa44628a3aa1e48d0c737ec369e777ccf6ab54e)
* [Fixes colorVariable test](https://github.com/material-foundation/material-remixer-js/commit/177bdb59616ba446faa00208237b2d9b2989a63d)
* [Updates firebase to prevent uninitialized app error.](https://github.com/material-foundation/material-remixer-js/commit/27c95fcf3d850a5b9a63cec37cdf9f49dd265a0b)

### New Features

* [Updates npm package dependencies](https://github.com/material-foundation/material-remixer-js/commit/f80b5858023345a6a9c36b1145c8c5378e5d1719)
* [Adds the share menu.](https://github.com/material-foundation/material-remixer-js/commit/13c59095de01c7e4e394758b795f06fddeecff71)
* [Adds remixer logo icon.](https://github.com/material-foundation/material-remixer-js/commit/e9d005ced3a8528abbb2c08a9cdd915e766f6658)
* [Adds new ColorUtils class to handle color alpha conversions.](https://github.com/material-foundation/material-remixer-js/commit/aaf59ee4cd9447b738e1f07424df62f61703c2c9)
* [Adds app screenshot.](https://github.com/material-foundation/material-remixer-js/commit/ec4b998216be5240b9bec84243e5535ff4c3eb76)
* [Adds new demo app.](https://github.com/material-foundation/material-remixer-js/commit/095254e86bf770091d53fb10cebc3f71820658bf)
* [Adds Firebase configuration documentation.](https://github.com/material-foundation/material-remixer-js/commit/da41011993fc684b4bddb353a92ae3bf6bb5f405)

## 0.5.8

### Bug Fixes

* [Renames defaultValue to initialValue throughout.](https://github.com/material-foundation/material-remixer-js/commit/bf4c7bfb5427e070aeb7b26fb8e66643696fffa6)
* [Updates webpack config source mapping.](https://github.com/material-foundation/material-remixer-js/commit/7cb0c9b37ee614c1e3fa1ecc74cd196e4fec83e4)
* [Fixes title when deserializing variable.](https://github.com/material-foundation/material-remixer-js/commit/46f241031fb91a1732721f4772bbeb2737ac0b1c)
* [Updates localStorage schema](https://github.com/material-foundation/material-remixer-js/commit/a6ca1b2341af96635ef184ba1992ea1d745dbe00)
* [Fixes Variable.clone() wrongly setting selectedValue to initialValue.](https://github.com/material-foundation/material-remixer-js/commit/19ef8e4af6b3eafe997a7d561740f6915a50202e)
* [Updates overlay title bar background color.](https://github.com/material-foundation/material-remixer-js/commit/130026e9a356db0185ebee70b8f964f2248aa39b)
* [Cleans up remote controller class.](https://github.com/material-foundation/material-remixer-js/commit/715812d56d61aa8daeadbba20abc72ed9eed0030)
* [Makes deserialize publicly available.](https://github.com/material-foundation/material-remixer-js/commit/ded22f9c3da46bdc87250f141d5a1b15551d8057)

### New Features

* [Updates MDL controls to allow remote updates.](https://github.com/material-foundation/material-remixer-js/commit/823d8e29320b790bc5331ce6b9b0f27ca1b0ce54)
* [Adds ability to sync with remote controller.](https://github.com/material-foundation/material-remixer-js/commit/7a4847dc9e169f1742a94cb09941006f58a61a6c)

## 0.5.7

* [Updates webpack configuration.](https://github.com/material-foundation/material-remixer-js/commit/fffca3cf29960defe0b280cbe60f37308dc1aaf5)
* [Adds variable `constraintType` and updates `dataType`.](https://github.com/material-foundation/material-remixer-js/commit/b4be6daf176cf0f36a6fa9e32e94edbd6703d70a)
* [Renames possibleValues to limitedToValues.](https://github.com/material-foundation/material-remixer-js/commit/c795fd8533f4ae5f85a1b1b857a70dfc59e6890f)
* [Adds variable `controlType` property.](https://github.com/material-foundation/material-remixer-js/commit/83e326d8fbb947abfd59f5421b2ac0d43713659c)
* [Adds clone tests and updates `dataType` tests for variables.](https://github.com/material-foundation/material-remixer-js/commit/8949d8d33d25f41ad45c70c7e1b8289ebe7664fa)
* [Converts colors to rgba during serialization.](https://github.com/material-foundation/material-remixer-js/commit/40f673f5057776681e0fdee1db903cf789b6de2d)

## 0.5.6

* [Adds editorconfig file.](https://github.com/material-foundation/material-remixer-js/commit/6925701f3a7c05cc2b0ac174331a1fd1d8539dd7)
* [Adds tests for UI control classes.](https://github.com/material-foundation/material-remixer-js/commit/45b343608515871053382dfa6d0a8876d82374a5)

## 0.5.5

* [Renames to material-remxer-js.](https://github.com/material-foundation/material-remixer-js/commit/6bcebcdbc2bed6b8a8bac62a32f4d6f2fe8f9d93)
* Adds codecov.

## 0.5.4

* [Adds `lesshint` CSS/LESS linter.](https://github.com/material-foundation/material-remixer-js/commit/c86ffdec4f8a3796abd94b18d095e4f00b874cea)

## 0.5.3

* [Updates per tslint core rules.](https://github.com/material-foundation/material-remixer-js/commit/94e39ac7ae54d9d2549281558cf5160861b7386b)
* [Adds additional tests for `Remixer` and `LocalStorage`](https://github.com/material-foundation/material-remixer-js/commit/3925ac91914cf1ea85c34f4aa2fd284c71c9aac3).

## 0.5.2

* [Replaces gulp with NPM scripts.](https://github.com/material-foundation/material-remixer-js/commit/e3f97595016236cb24a60071ad8d41819590b52a)

## 0.5.1

Initial release.
