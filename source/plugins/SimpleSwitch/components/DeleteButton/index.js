
module.exports = require('./DeleteButton.jsx');

if(module.hot) {
    module.hot.accept('./DeleteButton.jsx', function() {

        var DeleteButton = require('./DeleteButton.jsx');
        
        core.injector.revoke(DeleteButton.name);
        core.View(DeleteButton);
        core.emit('hotUpdate');
        
    });
}