
import { Typography, AppBar, Button, Paper, Tabs, IconButton, Tab, Icon } from '@material-ui/core';

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
    dependencies: ['SimpleSwitch.NoResults','SimpleSwitch.Loader' ],

    get(NoResults, Loader) {

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
                    tabValue: 0,
                    activeTab: { key: 'theme', label: 'theme' },
                    tabs: [{
                        label: 'theme',
                        key: 'theme',
                        data: null,
                        ui: 'SimpleSwitch.ThemeEditor'
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
                    let { asObject } = config;
                    for (let i = 0; i < tabs.length; i++) {
                        if (tabs[i].key == key) {
                            tabs[i].data = asObject[key];
                            activeTab = tabs[i];
                        }
                    }
                    this.setState({ tabs, activeTab })
                }
            },

            getTabContent({ key, label }){
                let { activeTab } = this.state;
                let { data, ui } = activeTab;
                var Ui = core.components[ui];
                if (Ui) return <Ui data={ data } />
            },

            handleChange  (event, tabValue) {
                this.setState({ tabValue });
                this.setTabData(this.state.tabs[tabValue], this.props.config)
            },

            handleSave(){
              let { activeTab } = this.state;
              core.plugins.SimpleSwitch.run('saveSettings',activeTab)


            },
            render() {

                let { config } = this.props;
                let { tabValue, tabs, activeTab } = this.state;
                return (

                    <div id={'root.settings'} style={{ height: '100%', width: '100%', display: 'flex',  flexDirection: 'column' }}>
                        <AppBar position="static" color="default">
                            <Tabs
                                style={{ minHeight: 40, maxHeight: 40, height: 40}}
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
                        </AppBar>
                        <div style={{ position: 'absolute', top: '55px', left: '15px', right: '0', bottom: '15px', padding: '1px 16px 1px 1px', overflow: 'auto' }}>
                            {
                                this.getTabContent(tabs[tabValue])
                            }
                        </div>

                        <Button variant="contained" size="small" aria-label="Save" onClick={ this.handleSave } style={{
                          position: 'absolute', bottom: '15px', right: '15px', height: '35px' }}>
                          <Icon style={{ fontSize: 16, cursor: 'pointer', marginRight: 5 }} >{ core.icons('save') }</Icon>
                          {  core.translate('Save')+' '+activeTab.label }
                        </Button>
                    </div>
                )


            }
        }
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
