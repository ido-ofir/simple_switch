
module.exports = require('./helper.js');

if(module.hot) {
    module.hot.accept('./helper.js', function() {

        var helper = require('./helper.js');
        
        core.injector.revoke(helper.name);
        core.Module(helper);
        core.emit('hotUpdate');

    });
}