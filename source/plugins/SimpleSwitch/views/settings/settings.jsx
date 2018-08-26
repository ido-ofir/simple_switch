
import { Typography, AppBar, Paper, Tabs, Tab } from '@material-ui/core';

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
    dependencies: ['SimpleSwitch.NoResults','SimpleSwitch.Loader'],

    get(NoResults, Loader) {

        var core = this;

        var { React, PropTypes } = core.imports;
        const styles = theme => ({
            root: {
                minHeight: 40, height: 40, maxHeight: 40
            },
            
        });
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
            },

            componentWillUnmount() {
                this.isUnmounted = true;

            },

            getInitialState() {
                return {
                    error: null,
                    tabValue: 0,
                    tabs: [{
                        label: 'theme',
                        key: 'theme',
                        data: null
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
            
            setTabData({ key, label }){
                let { config } = this.props;
                let { tabs } = this.state;
                if (config) {
                    let { asObject } = config;
                    this.setState({
                        tabs: [
                            ...this.state.tabs,
                            
                        ]
                    })
                    console.debug(`${key} config => `, asObject[key]);
                }
            },

            getTabContent({ key, label }){
                // var parsed = JSON.parse(this.props.config);
               
            },

            handleChange  (event, tabValue) {
                this.setState({ tabValue });
                this.setTabData(this.state.tabs[tabValue])
            },
            
            render() {

                let { config } = this.props;
                let { tabValue, tabs } = this.state;
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
                        <Paper style={{ padding: 16, height: '100%', width: '100%' }}>
                            <Typography component="div" >
                                Settings for { tabs[tabValue].label }
                            </Typography>
                            {
                                this.getTabContent(tabs[tabValue])
                            }
                        </Paper>
                     
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