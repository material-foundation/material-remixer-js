# Remixer API
The Remixer class is a singleton class that keeps track of all the Variables and deals with saving/syncing its values.

The following methods are the most commonly used to enable Remixer in your app.

- [remixer.start()](#start-static)
- [remixer.stop()](#stop-static)
- [remixer.addBooleanVariable()](#addbooleanvariable-static)
- [remixer.addColorVariable()](#addcolorvariable-static)
- [remixer.addNumberVariable()](#addnumbervariable-static)
- [remixer.addRangeVariable()](#addrangevariable-static)
- [remixer.addStringVariable()](#addstringvariable-static)

---

### start <sub><sup>`STATIC`</sup></sub>

Appends the HTML iFrame to body of client app. Attaches key listener to toggle Overlay visibility.

#### Syntax

```javascript
remixer.start();
remixer.start(remoteConfig);
```

#### Parameters

- **remoteConfig:** *object*

  The optional firebase configuration. Provide this configuration if you wish to use the remote controller.

  ```javascript
  var remoteConfig = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
    ...
  };
  ```

#### Returns void

---

### stop <sub><sup>`STATIC`</sup></sub>

Removes iFrame and attached key listener.

#### Syntax

```javascript
remixer.stop();
```

#### Returns void

---

### addBooleanVariable <sub><sup>`STATIC`</sup></sub>

Adds a boolean Variable to array of Variables with optional callback.

#### Syntax

```javascript
remixer.addBooleanVariable(key, defaultValue);
remixer.addBooleanVariable(key, defaultValue, callback(variable) { ... } );
```

#### Parameters

- **key:** *string*

  The key of the Variable.

- **defaultValue:** *boolean*

  The initial default value of the variable.

- `OPTIONAL` **callback:** *function*

  The callback method to be invoked when the Variable is updated. The function is passed with the updated variable argument.

#### Returns [BooleanVariable](https://material-foundation.github.io/material-remixer-js/docs/classes/_core_variables_booleanvariable_.booleanvariable.html)

---

### addColorVariable <sub><sup>`STATIC`</sup></sub>

Adds a color variable to array of variables with optional callback.

#### Syntax

```javascript
remixer.addColorVariable(key, defaultValue);
remixer.addColorVariable(key, defaultValue, limitedToValues);
remixer.addColorVariable(key, defaultValue, limitedToValues, callback(variable) { ... } );
```

#### Parameters

- **key:** *string*

  The key of the Variable.

- **defaultValue:** *string*

  The initial default value of the variable.

- `OPTIONAL` **limitedToValues:** *string[]*

  The optional array of allowed values.

- `OPTIONAL` **callback:** *function*

  The callback method to be invoked when the Variable is updated. The function is passed with the updated variable argument.

#### Returns [ColorVariable](https://material-foundation.github.io/material-remixer-js/docs/classes/_core_variables_colorvariable_.colorvariable.html)

---

### addNumberVariable <sub><sup>`STATIC`</sup></sub>

Adds a number variable to array of variables with optional callback.

#### Syntax

```javascript
remixer.addNumberVariable(key, defaultValue);
remixer.addNumberVariable(key, defaultValue, limitedToValues);
remixer.addNumberVariable(key, defaultValue, limitedToValues, callback(variable) { ... } );
```

#### Parameters

- **key:** *string*

  The key of the Variable.

- **defaultValue:** *number*

  The initial default value of the variable.

- `OPTIONAL` **limitedToValues:** *number[]*

  The optional array of allowed values.

- `OPTIONAL` **callback:** *function*

  The callback method to be invoked when the Variable is updated. The function is passed with the updated variable argument.

#### Returns [NumberVariable](https://material-foundation.github.io/material-remixer-js/docs/classes/_core_variables_numbervariable_.numbervariable.html)

---

### addRangeVariable <sub><sup>`STATIC`</sup></sub>

Adds a range Variable to array of Variables with optional callback.

#### Syntax

```javascript
remixer.addRangeVariable(key, defaultValue, minValue, maxValue, increment);
remixer.addRangeVariable(key, defaultValue, minValue, maxValue, increment, callback(variable) { ... } );
```

#### Parameters

- **key:** *string*

  The key of the Variable.

- **defaultValue:** *number*

  The initial default value of the variable.
  
- **minValue:** *number*

  The allowed minimum value of the variable.
  
- **maxValue:** *number*

  The allowed maximum value of the variable.
  
- **increment:** *number*

  The amount to increment the value.

- `OPTIONAL` **callback:** *function*

  The callback method to be invoked when the Variable is updated. The function is passed with the updated variable argument.

#### Returns [RangeVariable](https://material-foundation.github.io/material-remixer-js/docs/classes/_core_variables_rangevariable_.rangevariable.html)

---

### addStringVariable <sub><sup>`STATIC`</sup></sub>

Adds a string variable to array of variables with optional callback.

#### Syntax

```javascript
remixer.addStringVariable(key, defaultValue);
remixer.addStringVariable(key, defaultValue, limitedToValues);
remixer.addStringVariable(key, defaultValue, limitedToValues, callback(variable) { ... } );
```

#### Parameters

- **key:** *string*

  The key of the Variable.

- **defaultValue:** *string*

  The initial default value of the variable.

- `OPTIONAL` **limitedToValues:** *string[]*

  The optional array of allowed values.

- `OPTIONAL` **callback:** *function*

  The callback method to be invoked when the Variable is updated. The function is passed with the updated variable argument.

#### Returns [StringVariable](https://material-foundation.github.io/material-remixer-js/docs/classes/_core_variables_stringvariable_.stringvariable.html)
