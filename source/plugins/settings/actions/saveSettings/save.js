
module.exports = {
    name: "saveSettings",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;

        return (data, promise) => {
          let { fileData, dir } = data;

          var parsed = JSON.stringify(fileData, null, 4);
          core.request.post('/saveSettings', { fileData: parsed, dir: dir }).then( ({ response, results, error }) => {
              if (results.success) {

                let notify = {
                    title: core.translate(`${dir} saved`),
                    text: results.msg,
                    alertKind: 'success'
                }
                core.emit('notify',notify);

                core.plugins.Settings.set(['config', dir], fileData);
                core.tree.set(['plugins', dir], fileData);
                core.tree.commit();
                promise.resolve(results.success);

              }
          });
        };
    }
}
