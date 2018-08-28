var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Settings
const navMaxWidth = 64; //304;
const navMinWidth = 64;
const navTransition = 'all .25s ease-out';
const iconSize = 20;

const styles = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: navTransition,
        overflow: 'hidden',
        position: 'absolute'
    },
    placeHolderContainer: {
        transition: navTransition,
        position: 'relative',
        height:'100%',
        zIndex: 5
    },
    navList: {
        padding: 0
    },
    navRow: {
        container: {
            width: navMaxWidth,
            padding: '0',
            height: 40,
            cursor: 'pointer',
            zIndex: 1
        },
        inner: {
            display: 'flex',
            flex: 1,
            padding: '12px 16px 12px 21px',
            alignItems: 'center'
        },
        label: {
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 14
        },
        icon: {
            marginRight: 6
        }
    }
};

module.exports = {
    name: 'Nav',
    dependencies: [],
    get() {

        var core = this;

        return {

            getInitialState(){
                return {
                    navWidth: navMinWidth,
                    activeItem: 'explore'
                }
            },

            getListData(listPosition){

                switch(listPosition) {
                    case 'top':
                        return [
                            {
                              label: core.translate('Home'),
                              icon: core.icons('home'),
                              view: 'home'
                            },
                            {
                              label: core.translate('Settings'),
                              icon: core.icons('settings'),
                              renderTopBorder: true,
                              view: 'settings'
                            },
                        ];

                    case 'bottom':
                        return [
                          // {
                          //   label: core.translate('Settings'),
                          //   icon: core.icons('settings'),
                          //   renderTopBorder: true,
                          //   view: 'settings'
                          // },
                        ];
                    default:
                        return [];
                }
            },

            setActiveItem(itemKey, view){
               this.props.handleViews(view);
            },

            handleTabNavigation(state){
                let { navWidth } = this.state;
                if(state === 'focus'){
                    if(navWidth === navMaxWidth) return;
                    this.setState({navWidth: navMaxWidth});
                }
                else if(state === 'blur'){
                    if(navWidth === navMinWidth) return;
                    this.setState({navWidth: navMinWidth});
                }
            },

            getWrapperMouseEvents(){
                let isPinned = this.props.isOpen;
                if(isPinned) return {};
                return {
                    onMouseEnter: () => this.setState({navWidth: navMaxWidth}),
                    onMouseLeave: () => this.setState({navWidth: navMinWidth})
                };
            },

            renderNavRow(items){
                let { activeView } = this.props;
                // console.log(activeView);

                return (
                    items.map((item, key) => {
                        let view = item.view || null;
                        if ( item.disabled ) return null;
                        return(
                            <ListItem
                                key={key}

                                title={item.label}
                                button={true}
                                onClick={() => this.setActiveItem(item.label, view)}
                                disabled={item.disabled}
                                style={{...styles.navRow.container, cursor: 'pointer', borderTop: item.renderTopBorder ? `1px solid ${core.theme("colors.borderDark")}` : 'none'}}
                            >
                                <div style={{...styles.navRow.inner, background: item.disabled ? 'none' : (activeView === item.view) ? core.theme('colors.blue1') : 'none'}}>
                                    <ListItemIcon>
                                        <Icon style={{
                                          ...styles.navRow.icon,
                                          fontSize: iconSize,
                                          color: (activeView === item.view) ? core.theme("colors.secondary") : core.theme("colors.gray") }} >
                                        {item.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<span style={{...styles.navRow.label, color: item.disabled ? core.theme('colors.gray') : (activeView === item.view) ? core.theme("colors.secondary") : core.theme('colors.gray') }}>{item.label}</span>}
                                    />
                                </div>
                            </ListItem>
                        )
                    })
                )
            },

            render() {
                let { navWidth } = this.state;
                let isPinned = this.props.isOpen;
                let wrapperMouseEvents = this.getWrapperMouseEvents();
                return (
                    <div onBlur={() => this.handleTabNavigation('blur')} onFocus={() => this.handleTabNavigation('focus')} style={{...styles.placeHolderContainer, minWidth: isPinned ? navMaxWidth : navMinWidth, maxWidth: isPinned ? navMaxWidth : navMinWidth}}>
                        <div
                            {...wrapperMouseEvents}
                            style={{...styles.container, minWidth: isPinned ? navMaxWidth : navWidth, maxWidth: isPinned ? navMaxWidth : navWidth, background: core.theme("colors.dark")}}
                        >
                            <List component="nav" style={styles.navList}>
                                {this.renderNavRow(this.getListData('top'))}
                            </List>
                            <List style={styles.navList}>
                                {this.renderNavRow(this.getListData('bottom'))}
                                <ListItem
                                    primary=""
                                    button={true}
                                    onClick={() => core.plugins.ddmManager.run('toggleNav')}
                                    style={styles.navRow.container}>
                                    <div style={styles.navRow.inner}>
                                        <ListItemIcon>
                                        <Icon
                                          style={{...styles.navRow.icon,
                                                  fontSize: iconSize,
                                                  margin: 0, transform: isPinned ? 'rotate(0deg)' : 'rotate(-90deg)',
                                                  transition: 'transform 0.25s ease-out',
                                                  color: isPinned ? core.theme("colors.secondary") : core.theme("colors.gray")}}>
                                            {core.icons('pin')}
                                        </Icon>
                                        </ListItemIcon>
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                );
            }
        };
    }
};
