
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

        return ({ data, label }, promise) => {
            var { BaseApi } = core.plugins.SimpleSwitch;
            var parsed = JSON.stringify(data, null, 4)
            core.request.post('/saveFile', { fileName: label, text: parsed }).then( ({ response, results, error }) => {
                if (results.success) {
                  let notify = {
                      title: core.translate(`${label} saved`),
                      text: results.msg,
                      alertKind: 'success'
                  }
                  core.emit('notify',notify);
                }
            })
        };
    }
}
