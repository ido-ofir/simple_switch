
import { Typography, AppBar, Paper, Icon, Tabs, Tab } from '@material-ui/core';
import { SketchPicker } from 'react-color';

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

            getInitialState() {
              return {
                showColorPicker: false
              };
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

            toggleColorPicker(){
              this.setState({ showColorPicker: !this.state.showColorPicker })
            },


            renderColorPicker(){
              if (this.state.showColorPicker) {
                // return (<SketchPicker />)
                return core.plugins.popovers.openPopup({
                    title: 'SketchPicker',
                    body: <div><SketchPicker /></div>,
                    bodyStyle: { minWidth: 530, minHeight: 'unset', padding: '0px 22px' },
                    showButtons: false,
                    okButton: {
                        btnTitle: 'Pick',
                        btnFunc: () => {}
                    }
                });
              }
              return null
            },

            handleCopy(e){
              let { colorItem } = this.props;
              Helper.CopyTopClipboard(colorItem.data)
            },

            styles(field){
              let styles = {
                icon: { fontSize: 13, color: core.theme('colors.white'), cursor: 'pointer' },
                iconsContainer: {
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  height: '25px',
                  justifyContent: 'flex-end',
                  padding: '0 5px',
                }
              }
              return styles[field]
            },
            render() {
              let { colorItem } = this.props;
              return (

                <Paper  title={ colorItem.title } elevation={ 1 } style={{ flex: 1, height: 60, background: colorItem.data, position: 'relative' }}>
                  <Typography style={{ fontSize: 12 }}>
                  { colorItem.title }
                  </Typography>
                  <div style={ this.styles('iconsContainer') }>
                    <CopyToClipboard copyNode={ colorItem.data } size={12}/>

                    <Icon onClick={ this.toggleColorPicker } style={{ ...this.styles('icon') }}>
                      { core.icons('edit') }
                    </Icon>

                  {/*

                    // <Icon onClick={ this.handleCopy } style={{ ...this.styles('icon'), marginRight: 5 }} >
                    //   { core.icons('fileCopy') }
                    // </Icon>
                  */}
                  </div>
                  {this.renderColorPicker()}
                </Paper>

              )


            }
        }
    }
}
