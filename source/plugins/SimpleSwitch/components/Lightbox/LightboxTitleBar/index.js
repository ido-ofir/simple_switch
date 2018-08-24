
module.exports = require('./LightboxTitleBar.jsx');

if(module.hot) {
    module.hot.accept('./LightboxTitleBar.jsx', function() {

        var LightboxTitleBar = require('./LightboxTitleBar.jsx');
        
        core.injector.revoke(LightboxTitleBar.name);
        core.View(LightboxTitleBar);
        core.emit('hotUpdate');
        
    });
}