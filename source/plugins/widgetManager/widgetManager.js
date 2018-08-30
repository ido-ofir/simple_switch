module.exports = {
    name: 'widgetManager',
    tree: require('./tree.js'),
    actions: [],
    modules: [
        require('./components/GridManage'),
    ],
    components: [],

    init(definition, done) {
        var _gridManager = {};

        done(_gridManager);
    }
};
