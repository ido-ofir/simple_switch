
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

        return (data, promise) => {
          core.request.post('/loadFile').then( ({ response, results, error }) => {
              if (results.success) {
                let notify = {
                    title: 'loaded',
                    text: '',
                    alertKind: 'success'
                }
                core.emit('notify',notify);
              }
          });
        };
    }
}
