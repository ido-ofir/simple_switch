

# core theme plugin

A plugin for handeling a styling theme for client side applications.

This plugin defines a `theme` function on the core object itself:

```js
core.theme();
```
## Usage

The plugin body is a simple getter-setter for the underlying theme object, which is kept on the tree. a `load` function is added for convenience.

### Loading a theme
```js
var theme = {
    colors: {
        primary: '#f0f',
        secondary: '#00f'
    }
};

// following two lines are equal.
core.plugins.theme.load(theme);
core.plugins.theme.set('theme', theme);
```

### Accessing theme values

The shortest way to access a theme value is through the `core.theme` function:

```js
// using dot notation
core.theme('colors.primary');  // '#f0f'

// using an array path
core.theme(['colors', 'primary']);   // '#f0f'

// you can also get containing objects
core.theme('colors'); // { primary: '#f0f', secondary: '#00f' }
```