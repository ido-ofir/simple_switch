
import {
  Typography, AppBar, Toolbar, IconButton,
  Paper, Tabs, Tab, Icon, Menu, Divider,
  MenuItem, MenuList, Popper, Button
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
    dependencies: ['SimpleSwitch.NestedMenu', 'Settings.SavePopup'],

    get(NestedMenu, SavePopup) {

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

            componentDidMount() {
                this.isUnmounted = false;
                if (this.props.config) this.setTabData(this.state.activeTab, this.props.config)
                if (this.props.fileMenu) this.setMenu(this.props.fileMenu, this.state.activeTab);

            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.config && (!_.isEqual(nextProps.config, this.props.config))) {
                  this.setTabData(this.state.activeTab, nextProps.config)
                }
                if (nextProps.fileMenu && (!_.isEqual(nextProps.fileMenu, this.props.fileMenu))) {
                  this.setMenu(nextProps.fileMenu, this.state.activeTab)
                }
            },

            getInitialState() {

                return {
                    error: null,
                    anchorEl: null,
                    menuAnchorEl: null,
                    fileNameError: true,
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
                      onClick: this.openSavePopup,
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
                return (<Tab key={ i } label={ tab.label } style={{ minHeight: 40, maxHeight: 40, height: 40 }}/>);
            },

            setMenu(fileMenu, activeTab){
              let { menuList } = this.state;
              if (fileMenu) {
                let items = fileMenu[activeTab.label];
                let newMenuList = _.map(menuList, (item)=>{
                  if (item.nested) {
                    return {
                      ...item,
                      nested: _.map(items, (nestedItem)=>{
                        return {
                          label: nestedItem.fileName,
                          onClick: () => { this.handleLoadFile(nestedItem.fileName) }
                        }
                      })
                    }
                  } else return item
                });
                this.setState({ menuList: newMenuList })
              }

            },
            handleLoadFile(fileName){
              console.log('fileName => ', fileName);
              let { activeTab } = this.state;
              core.plugins.Settings.run('loadFile', { fileName, dir: activeTab.key });

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

            getTabContent({ key, label }){
                let { activeTab } = this.state;
                let { data, ui } = activeTab;
                var Ui = core.views[ui];
                if (Ui) return ( <Ui data={ data } onChange={ this.handleConfigChange }/> );
            },

            handleChange(event, tabValue) {
                this.setState({ tabValue });
                this.setTabData(this.state.tabs[tabValue], this.props.config);
                this.setMenu(this.props.fileMenu, this.state.tabs[tabValue])
            },

            handleSave(){
              let { activeTab } = this.state;
              let data = {
                fileData: activeTab.data,
                dir: activeTab.key,
              }

              core.plugins.Settings.run('saveSettings', data);
            },

            handleSaveAs(set){
              let { fileNameToSave } = this.state;
              let { activeTab } = this.state;

              let fname = fileNameToSave && fileNameToSave.length ? fileNameToSave.trim() : null;
              if (fname) {
                fname = fname.split(' ').join('_');
                let saveData = {
                  fileName: fname,
                  fileData: activeTab.data,
                  dir: activeTab.key,
                  set: set
                }

                core.plugins.Settings.run('saveFile', saveData).then(()=>{ core.emit('Popup.close') });

              } else {
                let notify = {
                    title: 'File Name Error ',
                    text: 'Invalid file name',
                    alertKind: 'error'
                }
                core.emit('notify',notify);
                return;
              }
            },

            handleFileName(fileName){
              this.setState({ fileNameToSave: fileName })
            },

            openSavePopup(){
              core.plugins.popovers.openPopup({
                  title: core.translate('Save new file'),
                  body: <SavePopup handleFileName={ this.handleFileName } />,
                  modalStyle: { height: 200 },
                  bodyStyle: { minWidth: 400, minHeight: 'unset', padding: '0px 22px' },
                  buttons:[
                    <Button key={ 'set' } onClick={ () => { this.handleSaveAs(true) } } style={{ ...styles.button  }} >
                      { core.translate('Save file and set') }
                    </Button>,
                    <Button key={ 'save' } onClick={ () => { this.handleSaveAs(false) } } style={{ ...styles.button  }} >
                      { core.translate('Save file') }
                    </Button>
                  ],
                  okButton: {
                      btnTitle: null,
                      btnFunc: null
                  }
              });
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
                            <NestedMenu list={ menuList } />
                        </AppBar>

                        <div style={ styles.tabContent }>
                            {
                                this.getTabContent(tabs[tabValue])
                            }
                        </div>

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
  button: {
    minHeight: 30,
    maxHeight: 30,
    width: 'auto',
    pedding: 0,
    fontSize: 12,
    borderRadius: 2
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
