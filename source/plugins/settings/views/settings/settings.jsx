
import {
  Typography, AppBar, Toolbar, IconButton,
  Paper, Tabs, Tab,
  Icon, Menu, MenuItem,
  Divider
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
    },
    dependencies: [],

    get() {

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
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.config && (!_.isEqual(nextProps.config, this.props.config))) {
                  this.setTabData(this.state.activeTab, nextProps.config)
                }
            },

            getInitialState() {

                return {
                    error: null,
                    anchorEl: null,
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
                    }]
                };
            },

            renderTab(tab, i){
                return <Tab key={ i } label={ tab.label } style={{ minHeight: 40, maxHeight: 40, height: 40 }}/>
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
                    this.setState({ tabs, activeTab })
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

            handleSaveMenu(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            handleCloseSaveMenu(e){
              this.setState({ anchorEl: null })
            },

            render() {
                let { config } = this.props;
                let { tabValue, anchorEl, tabs, activeTab } = this.state;
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


                          <IconButton
                                  style={{ height: 40, width: 40 }}
                                  size={ 'small' }
                                  onClick={ this.handleSaveMenu }>
                            <Icon style={{ cursor: 'pointer', marginRight: 5 }} >{ core.icons('more') }</Icon>
                          </IconButton>
                        </AppBar>

                        <div style={ styles.tabContent }>
                            {
                                this.getTabContent(tabs[tabValue])
                            }
                        </div>
                        <Menu
                          MenuListProps={{ style: { width: 220 }, dense: true }}
                          anchorEl={anchorEl}
                          open={ Boolean(anchorEl) }
                          onClose={ this.handleCloseSaveMenu } >

                          <MenuItem style={ styles.menuItem } onClick={ this.handleSave }>  {  core.translate('Save')+' '+activeTab.label }</MenuItem>
                          <MenuItem style={ styles.menuItem } onClick={this.handleCloseSaveMenu}>  {  core.translate('Save as') }</MenuItem>

                          <Divider style={{ margin: '5px 0' }} />

                          <MenuItem style={ styles.menuItem } onClick={this.handleLoad}>  {  core.translate('Load') }</MenuItem>

                        </Menu>

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
