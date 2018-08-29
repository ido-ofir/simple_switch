module.exports = {
    name: 'SimpleSwitch',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getLanguage'),
        require('./actions/logIn'),
        require('./actions/getDataEx'),
    ],
    modules: [
        require('./modules/Helper'),
        require('./modules/rules'),

        require('./modules/dataModels/DataModelsEntry'),
        require('./modules/dataModels/constructors/Basic'),
    ],
    components: [
        require('./components/ActionButton'),
        require('./components/AppBar'),
        require('./components/Badge'),
        require('./components/CountrySelect'),
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
