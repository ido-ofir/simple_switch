module.exports = {
    name: 'accessibleTo',
    dependencies: ['core.plugin.tree'],
    tree: {
        language: {}
    },
    extend: {
        accessibleTo( parameters = '', goHome = '') {
            let currentUser   = (localStorage.currentUser) ? JSON.parse(localStorage.getItem('currentUser')) : {};
            let currentuserIsAdmin      = !_.isEmpty(currentUser) ? currentUser.roles.includes('ROLE_ADMIN') : false;
            let currentUserIsSuperAdmin = !_.isEmpty(currentUser) ? currentUser.roles.includes('ROLE_SUPER_ADMIN') : false;

            const notAuthorized = () => {
                core.emit('notify', {
                    title: core.translate('Access Denied'),
                    text: core.translate('User without permitions to access this page'),
                    alertKind: 'error'
                });
                core.plugins.router.to('/home');
            }

            let accessible = true;
            if ( _.isEmpty( parameters ) ) { accessible = false; }
            else if ( parameters === 'ROLE_SUPER_ADMIN' && !currentUserIsSuperAdmin ) { accessible = false; } 
            else if ( parameters === 'ROLE_ADMIN' && !currentuserIsAdmin ) { accessible = false; }

            if (goHome === 'goHome' && !accessible ) return notAuthorized();
            else return accessible;
        }
    },
    init(def, done) {
        var core = this;
        done({});

    }
};