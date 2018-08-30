module.exports = {
    name: 'icons',
    tree: {
        menu: 'menu',
        home: 'home',
        more: 'more_vert',
        folder: 'folder',
        addFolder: 'create_new_folder',
        folderShared: 'folder_shared',
        users: 'group',
        add: 'add',
        edit: 'edit',
        delete: 'delete',
        settings: 'settings',
        check_circle: 'check_circle',
        check_outline: 'check',
        remove_circle: 'remove_circle',
        search: 'search',
        back: 'arrow_back',
        filter: 'filter_list',
        help: 'help_outline',
        upload: 'cloud_upload',
        save: 'file_download',
        download: 'file_download',
        alphabetical: 'sort_by_alpha',
        event: 'event_note',
        person: 'person',
        close: 'close',
        navigateUp: 'keyboard_arrow_up',
        navigateDown: 'keyboard_arrow_down',
        navigatePrevious: 'keyboard_arrow_left',
        navigateNext: 'keyboard_arrow_right',
        arrow_right: 'arrow_right',
        collapseClose: 'keyboard_arrow_down',
        collapseOpen: 'keyboard_arrow_up',
        dropDown: 'arrow_drop_down',
        fileCopy: 'file_copy',
        gallery: 'photo_library',
        memory: 'memory',
        power: 'power_settings_new',
        archive: 'archive',
        unarchive: 'unarchive',
        media: 'perm_media',
        chat: 'chat',
        location: 'location_on',
        refresh: 'refresh',
        lock: 'lock',
        document: 'assignment',
        info: 'info',
        maximize: 'crop_square',
        minimize: 'filter_none',
        expandMore: 'expand_more',
        expandLess: 'expand_less',
        merge: 'merge_type',
        unmerge: 'call_split',
        drag: 'drag_indicator',
        star_full: 'star',
        star_empty: 'star_border',
        fullscreen: 'fullscreen',
        fullscreen_exit: 'fullscreen_exit',
        link: 'link',
        male: 'fas fa fa-mars',
        female: 'fas fa fa-venus',
        lightBulb: 'fas fa-lightbulb',
        bulkSearch: 'playlist_add',
        exitApp: 'exit_to_app',
        email: 'email',
        like: 'thumb_up',
        pdfFile: 'fas fa-file-pdf',
        filter_1: 'filter_1',
        filter_1: 'filter_2',
        filter_1: 'filter_3',
        filter_1: 'filter_4',
        filter_1: 'filter_5',
        filter_1: 'filter_6',
        filter_1: 'filter_7',
        filter_1: 'filter_8',
        filter_1: 'filter_9',
        school: 'school',
        highlight_off: 'highlight_off',


        // social icons - material don't have ones, so we use FontAwesome

        defaultIcon: 'fa fa-globe',
        facebook: 'fab fa-facebook-f',
        flickr: 'fab fa-flickr',
        viber: 'fab fa-viber',
        foursquare: 'fab fa-foursquare',
        'google+': 'fab fa-google-plus',
        google: 'fab fa-google',
        linkedin: 'fab fa-linkedin',
        pinterest: 'fab fa-pinterest',
        ok: 'fab fa-odnoklassniki',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        'vk.com': 'fab fa-vk',
        skype: 'fab fa-skype',
        wikipedia: 'fab fa-wikipedia-w',
        'windows live': 'fab fa-windows',
        'yahoo! profile': 'fab fa-yahoo',

        // Gallery Icons
        circle: 'fiber_manual_record',

    },
    extend: {
        icons(iconName) {
            var icons = this.plugins.icons;
            if (!iconName) return;
            var value = icons.get(iconName);
            return value;
        }
    },
    init(def, done) {
        var core = this;
        done({});

    }
};
