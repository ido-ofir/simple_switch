
module.exports = require('./Panel.jsx');

if(module.hot) {
    module.hot.accept('./Panel.jsx', function() {

        var Panel = require('./Panel.jsx');
        
        core.injector.revoke(Panel.name);
        core.View(Panel);
        core.emit('hotUpdate');
        
    });
}