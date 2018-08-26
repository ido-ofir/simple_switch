
import { Typography, AppBar, Paper, Tabs, Tab } from '@material-ui/core';


module.exports = {
    name: "ColorBox",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper', 'SimpleSwitch.NoResults', 'SimpleSwitch.Loader', 'SimpleSwitch.ExpandingPanel', 'SimpleSwitch.CopyToClipboard'],

    get(Helper, NoResults, Loader, ExpandingPanel, CopyToClipboard) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                colorItem: PropTypes.object,
            },

            getDefaultProps(){
                return {
                  colorItem: { title: 'test' },
                };
            },

            componentDidMount() {
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            render() {
              let { colorItem } = this.props;
              return (

                <Paper  title={ colorItem.title } elevation={ 1 } style={{ flex: 1, height: 60, background: colorItem.data }}>
                  <Typography style={{ fontSize: 12 }}>
                  { colorItem.title }
                  </Typography>
                  <CopyToClipboard copyNode={ colorItem.data }/>
                </Paper>

              )


            }
        }
    }
}
