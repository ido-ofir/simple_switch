module.exports = {
    name: "getConfiguration",
    dependencies: ['SimpleSwitch.helper'],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get(Helper) {

        var core = this;

        return (data, promise) => {

            core.request.post('/getConfigFile').then( ({ response, results, error }) => {
                if(error){
                  Helper.handleActionError(error, promise);
                  return;
                }
                var theme = core.tree.get(['plugins', 'theme', 'theme']);
                var str = JSON.stringify({ ...results, theme }, null, 4);
                var obj = { ...results, theme };
                promise.resolve({ asString: str, asObject: obj });
            });
        };
    }
}
