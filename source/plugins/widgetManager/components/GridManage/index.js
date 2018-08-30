
module.exports = require('./GridManage.jsx');

if(module.hot) {
    module.hot.accept('./GridManage.jsx', function() {

        var GridManage = require('./GridManage.jsx');
        
        core.injector.revoke(GridManage.name);
        core.Component(GridManage);
        core.emit('hotUpdate');
        
    });
}