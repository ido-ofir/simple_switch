module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [
      require('./actions/getConfiguration'),
      require('./actions/saveFile'),
    ],
    modules: [

    ],
    components: [
        require('./components/ColorBox'),
        require('./components/ColorPicker'),
    ],
    views: [
        require('./views/settings'),
        require('./views/ThemeEditor'),
    ],

    init(definition, done) {

        var _options = {
            BaseApi: 'http://some.ip.for/api',
            getInitialFiles: (callback) => {
              core.plugins.Settings.run('getConfiguration').then((config)=>{
                // console.debug('config > ', config);
                // return config;
                if (callback) callback(config)
                // core.plugins.Settings.set('config', config);
              })
            }
        };

        done(_options);
    }
};