
module.exports = require('./Manager.jsx');

if(module.hot) {
    module.hot.accept('./Manager.jsx', function() {

        var Manager = require('./Manager.jsx');
        
        core.injector.revoke(Manager.name);
        core.Component(Manager);
        core.emit('hotUpdate');
        
    });
}