import React from 'react';
import  _isEmpty  from 'lodash/isEmpty'
import { Manager, Target, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import Portal from '@material-ui/core/Portal';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

core.Component('DropDownMenu', ['mui.FusionIcon'], (FusionIcon) => {

    return {

        renderMenuList(){
            let { close, menuWidth='auto', menuItemsData=[], itemLeftTextStyle={}, itemRightTextStyle={} } = this.props;
            
            return(
                <MenuList role="menu">
                    {
                            menuItemsData.map((item, i) => {
                                return(
                                    <MenuItem
                                        key={i} 
                                        onClick={item.onClick} 
                                        style={{minWidth: menuWidth, maxWidth: menuWidth, padding: '6px 12px', borderBottom: item.renderBottomDivider ? `1px solid ${core.theme('colors.border')}` : 'none'}}
                                    >
                                        <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
                                            {
                                                item.leftText ?
                                                    <span style={itemLeftTextStyle}>{item.leftText}</span>
                                                    : null

                                            }
                                            {
                                                item.rightText ?
                                                    <span style={itemRightTextStyle}>{item.rightText}</span>
                                                    : null
                                            }
                                        </div>
                                    </MenuItem>
                                )
                            })
                    }
                </MenuList>
            )
        },

        handleClose(event){
            if (this.target.contains(event.target)) {
              return;
            }

            this.props.close();
        },
        
        render() {
            let { isOpen, close, handleOpenMenu, title = '', placement = 'bottom-start', titleStyle = {}, targetIcon = null, renderItemsList = null, targetIconDisbled = false } = this.props;
            return(
                <Manager>
                    <Target>
                        <div ref={node => {this.target = node;}}>
                        {
                            targetIcon && !_isEmpty(targetIcon) ? 
                                <IconButton 
                                    disabled={targetIconDisbled}
                                    color="inherit"
                                    onClick={handleOpenMenu}
                                    style={{width: 30, height: 30}}
                                >
                                    <FusionIcon
                                        icon={ targetIcon.icon || core.icons('openMenu')}
                                        size={ targetIcon.size || 20}
                                        color={targetIcon.color || core.theme('colors.gray5')}
                                    />

                                </IconButton>
                                :
                                <Button 
                                    variant="text" 
                                    onClick={handleOpenMenu}
                                    aria-owns={isOpen ? 'menu-list-grow' : null}
                                    aria-haspopup="true"
                                    style={{minWidth: 'auto', padding: '6px 12px'}}
                                >
                                    <span style={titleStyle}>{ title }</span>
                                    <FusionIcon 
                                        icon={core.icons('dropDown')}
                                        size={18} 
                                        color={core.theme('colors.white')} 
                                    />
                                </Button>
                        }
                        </div>
                    </Target>
                    <Portal>
                        <Popper
                            placement={placement}
                            eventsEnabled={isOpen}
                            style={{zIndex: 12}}
                        >
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <Collapse in={isOpen} id='menu-list-grow' style={{ transformOrigin: '0 0 0' }}>
                                    <Paper style={{ margin: 3 }}>
                                        { this.renderMenuList() }
                                        {
                                            renderItemsList ? renderItemsList : null
                                        }
                                    </Paper>
                                </Collapse>
                            </ClickAwayListener>
                        </Popper>
                    </Portal>
                </Manager>
            )
        }
    }
});
