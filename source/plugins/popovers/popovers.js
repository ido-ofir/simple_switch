module.exports = {
    name: 'popovers',
    tree: require('./tree.js'),
    actions: [],
    modules: [
        require('./modules/PopupHandler'),
    ],
    components: [
        require('./components/Caution'),
        require('./components/Notify'),
        require('./components/Popup'),
        require('./components/Lightbox'),
        // require('./components/Lightbox/Gallery'),
        require('./components/Lightbox/LightboxInfo'),
        require('./components/Lightbox/LightboxTitleBar'),
    ],

    init(definition, done) {
        var core = this;

        var notifications = {

            addNotify(title,text,alertKind) {
                core.emit('addNotify',{title,text,alertKind});
            },

            openPopup(data) {
                let {title, body, bodyStyle, okButton} = data;
                let {btnTitle, btnFunc} = okButton;

                core.emit('Popup', {title, body, bodyStyle, btnTitle, btnFunc});
            },

            Caution(text,title,func) {
                core.emit('Caution', {text, title, func} );
            },

            openLightbox() {
                core.emit
            },

            openGallery() {},

        };

        done(notifications);
    }
};
