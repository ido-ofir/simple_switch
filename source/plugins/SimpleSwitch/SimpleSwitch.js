module.exports = {
    name: 'SimpleSwitch',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getLanguage'),
        require('./actions/logIn'),
    ],
    modules: [
        require('./modules/helper'),
        require('./modules/rules'),
    ],
    components: [
        require('./components/ActionButton'),
        require('./components/AppBar'),
        require('./components/Badge'),
        require('./components/CopyToClipboard'),
        require('./components/CountrySelect'),
        require('./components/DeleteButton'),
        require('./components/ExpandingPanel'),
        require('./components/IconPopover'),
        require('./components/Loader'),
        require('./components/Nav'),
        require('./components/NoResults')
    ],
    views: [
        require('./views/login'),
        require('./views/root'),
        require('./views/home')
    ],

    init(definition, done) {

        var _simpleOptions = {
            BaseApi: 'http://some.ip.for/api',
        };

        done(_simpleOptions);
    }
};
