
import { Typography, AppBar, Paper, Tabs, Tab } from '@material-ui/core';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/kr_theme';


module.exports = {
    name: "ThemeEditor",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.NoResults','SimpleSwitch.Loader'],

    get(NoResults, Loader) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                data: PropTypes.object,
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                  data: {}
                };
            },

            componentDidMount() {
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {

            },


            getInitialState() {

                return {

                };
            },

            render() {

                return (

                    <div id={'root.settings'} style={{ height: '100%', width: '100%', display: 'flex',  flexDirection: 'column' }}>
ThemeEditor

                    </div>
                )


            }
        }
    }
}
