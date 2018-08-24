
import { Typography } from '@material-ui/core';

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
    dependencies: ['SimpleSwitch.Panel', 'SimpleSwitch.NoResults','SimpleSwitch.Loader'],

    get(Panel, NoResults, Loader) {

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
            },

            componentWillUnmount() {
                this.isUnmounted = true;

            },

            getInitialState() {
                return {
                    error: null,
                };
            },

            render() {

                let { config } = this.props;
                // console.log('config => ', config);
                return (

                    <Panel id={'root.settings'} style={{ height: '100%', width: '100%', display: 'flex', padding: 15, flexDirection: 'column' }}>
                      {/*
                      <Typography>
                        Settings...
                      </Typography>
                      */}
                      <AceEditor
                        ref={ 'aceEditor' }
                        style={{ height: '99%', width: '100%' }}
                        mode={ 'json' }
                        theme={ 'kr_theme' }
                        wrapEnabled={ true }
                        debounceChangePeriod={ 150 }
                        value={ config != null ? `${JSON.parse(config)}` : '' }
                        editorProps={{ $blockScrolling: Infinity }}
                        // onChange={ this.handleEditorChange }
                        // commands={ keyBindings }
                        name={ '_jsonEditor' } />
                    </Panel>
                )


            }
        }
    }
}
