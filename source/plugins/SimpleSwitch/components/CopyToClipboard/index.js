
module.exports = require('./CopyToClipboard.jsx');

if(module.hot) {
    module.hot.accept('./CopyToClipboard.jsx', function() {

        var CopyToClipboard = require('./CopyToClipboard.jsx');
        
        core.injector.revoke(CopyToClipboard.name);
        core.View(CopyToClipboard);
        core.emit('hotUpdate');
        
    });
}