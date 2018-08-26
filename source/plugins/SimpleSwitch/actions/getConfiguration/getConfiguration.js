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

            core.request.get('/config/config.js').then( ({response, results,error}) => {
                if(error){
                  Helper.handleActionError(error, promise);
                  return;
                }

                var res = results.replace('module.exports = ', '');
                var theme = core.tree.get(['plugins', 'theme', 'theme']);
                var str = JSON.stringify({
                    ...JSON.parse(res),
                    theme
                }, null, 4)
                var obj = {
                    ...JSON.parse(res),
                    theme
                }
                // console.debug('obj => ', obj);
                promise.resolve({ asString: str, asObject: obj });
            });
        };
    }
}
