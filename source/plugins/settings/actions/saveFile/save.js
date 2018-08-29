
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

        return ({ data, label, key }, promise) => {
          var parsed = JSON.stringify(data, null, 4);
          core.request.post('/saveFile', { fileName: label, text: parsed, dir: key }).then( ({ response, results, error }) => {
              if (results.success) {
                let notify = {
                    title: core.translate(`${label} saved`),
                    text: results.msg,
                    alertKind: 'success'
                }
                core.emit('notify',notify);
                // console.log('label => ', label);
                // console.log('data => ', data);
                // console.log('key => ', key);
                core.plugins.Settings.set(['config', label], data)
                console.debug('core.plugins.Settings.get() > ', core.plugins.Settings.get());
                core.tree.set(['plugins', key], data);

              }
          });
        };
    }
}
