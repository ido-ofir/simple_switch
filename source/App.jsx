var React = require('react');
var ReactDom = require('react-dom');
var core = require('core.web');

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {main: '#01579b'},
        secondary: {main: '#2979ff'},
        disabled: { main: '#cfd8dc' }
    },
});

// automatically require all files that contain a '.module.' pattern.
core.injector.loadContext('SimpleSwitch', require.context('./', true, /.*\.module\./));

core.plugin([
    require('./plugins/translate'),
    require('./plugins/settings'),
    require('./plugins/theme'),
    require('./plugins/icons'),
    require('./plugins/request'),
    require('./plugins/router'),
    require('./plugins/popovers'),
    require('./plugins/gallery'),
    require('./plugins/widgetManager'),
    require('./plugins/SimpleSwitch'),
])

core.require(['SimpleSwitch.Root'], (Root) => {
    core.tree.commit();  // to prevent duplicate first render when Baobab updates
    ReactDom.render(<MuiThemeProvider theme={theme}><Root /></MuiThemeProvider>, document.getElementById('app'))
});
