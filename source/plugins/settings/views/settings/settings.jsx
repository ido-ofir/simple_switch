
import {
  Typography, AppBar, Toolbar, IconButton,
  Paper, Tabs, Tab, Icon, Menu, Divider,
  MenuItem, MenuList, Popper
} from '@material-ui/core';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/kr_theme';


module.exports = {
    name: "Settings",
    description: '',
    propTypes: {},
    bindings: {
      config: ['config'],
      fileMenu: ['fileMenu'],
    },
    dependencies: ['SimpleSwitch.NestedMenu'],

    get(NestedMenu) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },

            getDefaultProps(){
                return {

                };
            },
            componentWillMount() {
              // core.plugins.Settings.getInitialFiles();
              //   core.tree.set(['plugins', 'theme'], config.theme);
              //   core.plugins.Settings.set(['config'], config)
              // });
            },

            componentDidMount() {
                this.isUnmounted = false;
                if (this.props.config) this.setTabData(this.state.activeTab, this.props.config)
                if (this.props.fileMenu) this.setMenu(nextProps.fileMenu);

            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.config && (!_.isEqual(nextProps.config, this.props.config))) {
                  this.setTabData(this.state.activeTab, nextProps.config)
                }
                if (nextProps.fileMenu && (!_.isEqual(nextProps.fileMenu, this.props.fileMenu))) {
                  this.setMenu(nextProps.fileMenu)
                }
            },

            getInitialState() {

                return {
                    error: null,
                    anchorEl: null,
                    menuAnchorEl: null,
                    tabValue: 0,
                    activeTab: { key: 'theme', label: 'theme' },
                    tabs: [{
                        label: 'theme',
                        key: 'theme',
                        data: null,
                        ui: 'Settings.ThemeEditor'
                    },{
                        label: 'icons',
                        key: 'icons',
                        data: null
                    }],
                    menuList: [{
                      divider: false,
                      onClick: this.handleSave,
                      label: core.translate('Save'),
                    },{
                      divider: false,
                      onClick: null,
                      label: core.translate('Save as')+'...',
                    },{
                      divider: true
                    },{
                      divider: false,
                      onClick: null,
                      label: core.translate('Load file'),
                      nested: true

                    }]
                };
            },

            renderTab(tab, i){
                return <Tab key={ i } label={ tab.label } style={{ minHeight: 40, maxHeight: 40, height: 40 }}/>
            },

            setMenu(fileMenu){
              let { menuList, activeTab } = this.state;

              if (fileMenu) {
                let items = fileMenu[activeTab.label];
                let newMenuList = _.map(menuList, (item)=>{
                  if (item.nested) {
                    return {
                      ...item,
                      nested: _.map(items, (nestedItem)=>{
                        return {
                          label: nestedItem.fileName,
                          onClick: null
                        }
                      })
                    }
                  } else return item
                });
                this.setState({ menuList: newMenuList })
              }

            },

            setTabData({ key, label }, config){
                let { tabs } = this.state;
                if (config) {
                    let activeTab = null;
                    for (let i = 0; i < tabs.length; i++) {
                        if (tabs[i].key == key) {
                            tabs[i].data = config[key];
                            activeTab = tabs[i];
                        }
                    }
                    this.setState({ tabs, activeTab });
                }
            },

            handleConfigChange(){

            },

            getTabContent({ key, label }){
                let { activeTab } = this.state;
                let { data, ui } = activeTab;
                var Ui = core.views[ui];
                if (Ui) return ( <Ui data={ data } onChange={ this.handleConfigChange }/> );
            },

            handleChange(event, tabValue) {
                this.setState({ tabValue });
                this.setTabData(this.state.tabs[tabValue], this.props.config)
            },

            handleSave(){
              let { activeTab } = this.state;
              core.plugins.Settings.run('saveSettings', activeTab)
            },

            handleLoad(){
              core.plugins.Settings.run('loadSettings')
            },

            render() {

                let { config, fileMenu } = this.props;
                let { tabValue, anchorEl, tabs, activeTab, menuAnchorEl, menuList } = this.state;
                return (

                    <div id={'root.settings'} style={{ height: '100%', width: '100%', display: 'flex',  flexDirection: 'column' }}>

                        <AppBar position="static" color="default" style={{ flexDirection : 'row', height: 40 }}>
                            <Tabs
                                style={{ minHeight: 40, maxHeight: 40, height: '100%', width: '100%' }}
                                value={tabValue}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth={ true }
                                scrollable
                                scrollButtons="auto" >
                                {
                                    _.map(tabs, this.renderTab)
                                }
                            </Tabs>
                            <NestedMenu list={ menuList }/>
                            {/*
                          <IconButton
                                  style={{ height: 40, width: 40 }}
                                  size={ 'small' }
                                  onClick={ this.openSaveMenu }>
                            <Icon style={{ cursor: 'pointer', marginRight: 5 }} >{ core.icons('more') }</Icon>
                          </IconButton>
                        */}
                        </AppBar>

                        <div style={ styles.tabContent }>
                            {
                                this.getTabContent(tabs[tabValue])
                            }
                        </div>
                        {/*
                        <Menu
                          MenuListProps={{ style: { width: 220, borderRadius: 0 }, dense: true }}
                          anchorEl={anchorEl}
                          style={{ borderRadius: 0 }}
                          open={ Boolean(anchorEl) }
                          onClose={ this.closeSaveMenu } >

                          <MenuItem style={ styles.menuItem } onClick={ this.handleSave }>  {  core.translate('Save')+' '+activeTab.label }</MenuItem>
                          <MenuItem style={ styles.menuItem } onClick={this.closeSaveMenu}>  {  core.translate('Save as') }</MenuItem>

                          <Divider style={{ margin: '5px 0' }} />

                          <MenuItem style={ styles.menuItem } onClick={this.handleLoad } onMouseEnter={ this.openInnerMenu } onMouseLeave={ this.closeInnerMenu }>
                          {  core.translate('Load') }
                            <Icon style={{ position: 'absolute', right: 5, color: core.theme('colors.dark') }}>{ core.icons('arrow_right') }</Icon>
                            <Popper
                                  onMouseLeave={ this.closeInnerMenu }
                                  anchorEl={menuAnchorEl}
                                  open={ Boolean(menuAnchorEl) }
                                  style={{ zIndex: 1301 }}
                                  placement={ 'left-start' }
                                  onClose={ this.closeInnerMenu }>

                                  { this.renderInnerMenu(activeTab.label, fileMenu) }

                            </Popper>
                          </MenuItem>

                        </Menu>
                      */}

                    </div>
                )


            }
        }
    }
}
let styles = {
  tabContent: {
    position: 'absolute',
    top: '55px',
    left: '15px',
    right: '0',
    bottom: '15px',
    padding: '1px 16px 1px 1px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  menuItem: {
    height: 'auto',
    padding: '5px 5px 5px 24px',
    fontSize: '12px',
    height: '20px',
  }
}
                      {/* <AceEditor
                        ref={ 'aceEditor' }
                        style={{ height: '99%', width: '100%', borderRadius: 4 }}
                        mode={ 'json' }
                        theme={ 'kr_theme' }
                        wrapEnabled={ true }
                        debounceChangePeriod={ 150 }
                        value={ config != null ? `${}` : '' }
                        editorProps={{ $blockScrolling: Infinity }}
                        // onChange={ this.handleEditorChange }
                        // commands={ keyBindings }
                        name={ '_jsonEditor' } /> */}
