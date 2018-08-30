
module.exports = {
    name: "loadFile",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;
        return (data, promise) => {
          var config = {};
          var menu = {};

          core.request.post('/loadFile', { filename: data.fileName, dir: data.dir })
                      .then( ({ response, results, error }) => {

          //   if (error && error.data) {
          //     let notify = {
          //         title: 'Config files',
          //         text: error.data.msg,
          //         alertKind: 'error'
          //     }
          //     core.emit('notify',notify);
          //     return;
          //   }
          //   else if (results && results.success) {
          //     let { data } = results;
          //     _.map(data, configItem => {
          //       config[configItem.key] = {};
          //       config[configItem.key] = getConfigData(config, configItem);
          //     });
          //     menu = _.groupBy(data, 'key');
          //     promise.resolve({ config, menu })
          //   }
          });
        };
    }
}
