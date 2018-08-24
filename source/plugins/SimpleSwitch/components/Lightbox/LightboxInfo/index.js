
module.exports = require('./LightboxInfo.jsx');

if(module.hot) {
    module.hot.accept('./LightboxInfo.jsx', function() {

        var LightboxInfo = require('./LightboxInfo.jsx');
        
        core.injector.revoke(LightboxInfo.name);
        core.View(LightboxInfo);
        core.emit('hotUpdate');
        
    });
}