import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
var SvgIcons = require('@material-ui/icons');
// import * as SvgIcons from '@material-ui/icons';
var warnings = {}; // show one warning per missing icon to prevent overflowing the console.

//Documented in parts
core.Component('mui.FusionIcon', [], () => {

    return {

        mixins: [],

        propTypes: {
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
                PropTypes.array
            ]),
            style: PropTypes.object,
            size: PropTypes.number,
            color: PropTypes.string,
            hoverColor: PropTypes.string
        },

        getDefaultProps() {
            return {
                style: {},
                size: 24,
                color: '#666'
            }
        },

        checkIconType(icon) {
            let iconType = undefined;
            if(typeof icon === "string") iconType = 'string';
            if ((!!icon) && (icon.constructor === Object)) iconType = 'object';
            else if ((!!icon) && Array.isArray(icon)) iconType = 'array';
            return iconType;
        },

        handleRawIcons(iconObj){
            switch (iconObj.iconLib) {
                case "FontAwesome":
                    return { type: 'string', icon: iconObj.iconClass };
                case "material-icons":
                    return { type: 'array', icon: ["material-icons", iconObj.iconClass] };
                case "object":
                    return { type: 'object', icon: this.props.icon };
                default:
                    return { type: 'string', icon: iconObj.iconClass };
            }
        },

        render() {
            let { style, size, color, hoverColor, isRawIcon=false } = this.props;

            let MaterialSVGIcon, iconName, iconClass = '';
            let iconType = this.checkIconType(this.props.icon);
            let icon = (() => {
                if (this.props.isRawIcon) return this.handleRawIcons(this.props.icon);
                const getIconFallback = () => {
                    if(!icon) return;
                    let string = this.props.icon.toString();
                    if (!warnings[string]) {
                        console.warn(`The icon: '${this.props.icon}' could not be found, the icon probebly was misspelled or it's missing from the configuration file (fusion-icons.js).`);
                        warnings[string] = true;
                    }
                    return { type: this.checkIconType(core.fusionIcon('general.fallback')), icon: core.fusionIcon('general.fallback') };
                }
                switch (iconType) {
                    case "string":
                        return { type: 'string', icon: this.props.icon };
                    case "array":
                        return { type: 'array', icon: this.props.icon };
                    case "object":
                        return { type: 'object', icon: this.props.icon };
                    default:
                        return getIconFallback();
                }
            })()

            if(!icon){
                console.warn('Could not find the requested icon');
                return null;
            };

            iconType = icon.type;
            icon = icon.icon;

            switch (iconType) {
                case 'array':
                    // Material-Icons
                    let iconClass = icon[0];
                    let iconName = icon[1] || '';
                    
                    // Underscore to camelcase
                    let SVGIconName = iconName.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
                    SVGIconName = SVGIconName.charAt(0).toUpperCase() + SVGIconName.slice(1).replace(/_/g, "");
                    let MuiSVGIcon = SvgIcons[SVGIconName];
                    
                    if(MuiSVGIcon){
                        return (
                            <MuiSVGIcon
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style, fontSize: size, width: size, height: size, color: color }}
                            />
                        );
                    };

                    return (
                        <Icon
                            className={iconClass}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style, fontSize: size, width: size, height: size, color: color }}
                        >
                            {iconName}
                        </Icon>
                    );
                case 'object':
                    // SVG
                    return (
                        <svg
                            style={{ ...style, fill: color, width: size, height: size }}
                            viewBox={icon.viewBox}
                            dangerouslySetInnerHTML={{ __html: icon.children }}
                        />
                    )
                case 'string':
                    // FontAwesome
                    // iconName = icon.toLowerCase();
                    return (
                        <span
                            className={icon}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style, fontSize: size, color: color, minWidth: size, minHeight: size }}
                        />
                    );
                default:
                    iconClass = icon.toLowerCase();
                    return (
                        <Icon
                            className={iconClass}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style, fontSize: size, width: size, height: size, color: color }}
                        >
                            {iconName}
                        </Icon>
                    );
            }
        }
    }
});
