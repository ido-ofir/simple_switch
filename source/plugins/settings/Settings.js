module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [

    ],
    modules: [
 
    ],
    components: [
        require('./components/ThemeEditor'),
        require('./components/ThemeEditor/ColorBox'),
        require('./components/ThemeEditor/ColorPicker'),
    ],
    views: [
        require('./views/settings'),
    ],

    init(definition, done) {

        var _simpleOptions = {
            BaseApi: 'http://some.ip.for/api',
        };

        done(_simpleOptions);
    }
};
