
module.exports = require('./CssExamples.jsx');

if(module.hot) {
    module.hot.accept('./CssExamples.jsx', function() {

        var CssExamples = require('./CssExamples.jsx');
        
        core.injector.revoke(CssExamples.name);
        core.View(CssExamples);
        core.emit('hotUpdate');
        
    });
}