module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [
      require('./actions/getConfiguration'),
      require('./actions/saveSettings'),
      require('./actions/loadSettings'),
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
              // core.plugins.Settings.run('getConfiguration')
            core.plugins.Settings.run('loadSettings').then(( data )=>{
              // console.debug('data > ', data);
              let { config, menu } = data;

              if (menu) {
                core.plugins.Settings.set(['fileMenu'], menu)
              }

              if (config) {
                core.plugins.Settings.set(['config'], config)
                if (config.hasOwnProperty('theme')) {
                  core.tree.set(['plugins', 'theme'], config.theme);
                }
                if (callback) callback()
              } else if (callback) callback()
            })
          },

        };

        done(_options);
    }
};
