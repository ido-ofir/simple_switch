
module.exports = require('./AppBar.jsx');

if(module.hot) {
    module.hot.accept('./AppBar.jsx', function() {

        var AppBar = require('./AppBar.jsx');
        
        core.injector.revoke(AppBar.name);
        core.Component(AppBar);
        core.emit('hotUpdate');
        
    });
}