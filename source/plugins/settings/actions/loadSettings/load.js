
module.exports = {
    name: "loadSettings",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;

        const getConfigData = (config, file) => {
          let { modified, key, data } = file;
          if (!_.isEmpty(config[key])) {
            if (modified) return data;
          } else return data;
        }

        return (data, promise) => {
          var config = {};
          core.request.post('/loadSettings').then( ({ response, results, error }) => {

            if (error && error.data) {
              let notify = {
                  title: 'Config files',
                  text: error.data.msg,
                  alertKind: 'error'
              }
              core.emit('notify',notify);
              return;
            }
            else if (results && results.success) {
              let { data } = results;
              _.map(data, configItem => {
                config[configItem.key] = {}
                config[configItem.key] = getConfigData(config, configItem)
              });
              promise.resolve({config})
              // console.debug('config > ', config);
            }
          });
        };
    }
}
