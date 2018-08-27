// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {green, blue, amber, lime, teal, lightBlue} from '@material-ui/core/colors';
import {colors} from '@material-ui/core';

module.exports = {
    name: 'theme',
    dependencies: ['core.plugin.tree'],
    tree: {
        // theme: {
            colors: {
                primary: '#01579b',
                lightPrimary: '#2b73ab',
                error: "#ff0000",
                secondary: '#2979ff',
                white: '#ffffff',
                black: '#000000',
                dark: '#333333',
                gray1: '#fafafa',
                disable: '#d8d8d8',
                gold: '#ffe519',
                gray11: '#eaebeb',
                gray2: '#f5f5f5',
                gray3: '#999999',
                gray4: '#90a4ae',
                gray5: '#a9a9a9',
                gray6: '#b0bec5',
                gray7: '#78909c',
                gray8: '#666666',
                border: '#cfd8dc',
                borderDark: '#4e4e4e',
                borderlight: '#eceff1',
                blue: '#0d47a1',
                lightBlue: '#c2ebfa',
                lightBlueOpacity: '#c2ebfa50',
                lightBlue2: '#F4FAFE',
                lightBlue3: '#4c8aa2',
                editMode: '#ff9800',
                clearLight: 'rgba(255, 255, 255, .2)',
                clearDark: 'rgba(0, 0, 0, .2)',
                success: '#43A047',
                selected: '#19d421',
                progress: '#0085c2',
                merge: '#00a6db',
                badge: '#ff6d00',
                header: '#424242',
                headerFocus: '#01579b',
                subHeader: '#616161',
                actionIcons: '#607d8b',
                sectionsHeadLine: '#3c596b',
                tabBorder: '#0288d1',
                check: '#43a047',
                uncheck: '#ff817a'
            },

            notify: {
                success: '#56b631',
                error: '#cf3c3e',
                warning: '#2a3640',
                info: '#0085c2'
            },

            backgrounds: {
                primary: '#004175',
                secondary: '#e4f4ff',
                blue: '#0288D1',
                gray: colors.grey['500'],
                folders: '#009688',
                default: '#ffffff',
                content: '#e7ebee',
                panel: '#f1f1f1',
                nav: '#333333',
                item: '#ebebeb',
                superLightGrey: '#fafafa',
                lightbox: '#000000bb', //transparent
                black04: '#00000066', //transparent
                flash: '#d5ffdf',
                drop: colors.green['200'],
            },

            highlights: {
                amber: colors.amber['200'],
                lime: colors.lime['200'],
                indigo: colors.indigo['200'],
                lightBlue: colors.lightBlue['200'],
            },

            transparent: {
                white: '#ffffffe0',
                white_85: '#ffffffd9',
                black_80: '#000000cc',
            },

            circle:{
                background: '#ced4d4',
                done: colors.green['500'],
                progress: colors.blue['600'],
            },
            map: {
                education: 'red',
                hometown: 'cadetblue',
                related: 'purple',
                activities: 'orange',
                located: 'green'
            },
            socialNetwork: {
                '2chan':          "#fd7c17",
                'blogger':        "#fb8f3d",
                'dribbble':       "#ea4c89",
                'facebook':       "#3B5998",
                'flickr':         "#ff0084",
                'viber':          "#834995",
                'forrst':         "#5B9A68",
                'foursquare':     "#0072b1",
                'google':         "#C33424",
                'google+':        "#C33424",
                'instagram':      "#B13A7E",
                'nicovideo':      "#231f20",
                'niconico':       "#231f20",
                'linkedin':       "#0077B5",
                'ok':             "#EE8208",
                'pinterest':      "#cb2027",
                'quora':          "#a82400",
                'soundcloud':     "#ff3a00",
                'skype':          '#00A9F0',
                'stumbleupon':    "#EB4823",
                'tor':            "#7d4698",
                'tumblr':         "#32506d",
                'twitter':        "#55ACEE",
                'vk.com':         "#45668e",
                'vk':             "#45668e",
                'whatsapp':       "#59cf65",
                'wordpress':      "#21759b",
                'wikipedia':      '#b3b4b6',
                'windows live':   '#0078d7',
                'yahoo! profile': "#7B0099",
                'youtube':        "#E62B24",

            },
            images: {
                backLoginImage: "/resources/images/bgLogin.jpg",
            }
        // }
    },
    extend: {
        theme(path) {
            var theme = this.plugins.theme;
            if (!path) return theme.get();
            if (this.isString(path)) {
                path = path.split(/[\.,\/]/);
            }
            var value = theme.get(path);
            return value;
        }
    },
    init(def, done) {

        var core = this;
        done({
            // load(theme) {
            //     this.set('theme', theme);
            // },
            // setUpMuiTheme(fusionTheme) {
            //     const muiTheme = getMuiTheme({
            //         palette: {
            //             primary1Color: core.theme('main.primary'),
            //             accent1Color: core.theme('main.secondary')
            //         }
            //     });
            //     return muiTheme;
            // }
        });

    }
};
