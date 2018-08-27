
import { Typography, AppBar, Paper, Icon, Tabs, Tab } from '@material-ui/core';
import { SketchPicker } from 'react-color';

module.exports = {
    name: "ColorBox",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper', 'Settings.ColorPicker', 'SimpleSwitch.Loader', 'SimpleSwitch.ExpandingPanel'],

    get(Helper, ColorPicker, Loader, ExpandingPanel) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                colorItem: PropTypes.object,
            },

            getInitialState() {
              return {
                showButtons: false,
                anchorEl: null,
                newColor: ''
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

            openColorPicker(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            handleCopy(e){
              let { colorItem } = this.props;
              Helper.CopyTopClipboard(colorItem.data)
            },

            handleClosePicker(){
               this.setState({ anchorEl: null })
            },

            onColorPick(newColor){
              let { handleChange, colorItem, parentKey } = this.props;
              if (handleChange) handleChange({...colorItem, parentKey: parentKey}, newColor);
              this.handleClosePicker();
            },

            styles(field){
              let { showButtons } = this.state;
              let styles = {
                icon: { fontSize: 13, color: core.theme('colors.white'), cursor: 'pointer' },
                iconsContainer: {
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  height: '30px',
                  justifyContent: 'flex-end',
                  padding: '0 5px',
                  background: `linear-gradient(transparent 0, rgb(85, 85, 85) 100%)`,
                  opacity: showButtons ? 1 : 0,
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  transition: 'all 0.25s linear 0.15s'
                },
                // subheader: {
                //   padding: 5,
                //   fontSize: 12,
                //   color: core.theme('colors.white'),
                //   borderTopLeftRadius: '2px',
                //   borderTopRightRadius: '2px',
                //   transition: 'all 0.25s linear',
                //   background: `linear-gradient(rgb(85, 85, 85) 0%, transparent 100%)`
                // }
              }
              return styles[field]
            },

            getBackground(data){
              if (data.indexOf('/') > -1) {
                return `url("${data}") no-repeat 100%`
              } else return data;
            },

            render() {
              let { colorItem } = this.props;
              let { anchorEl, showButtons, newColor } = this.state;
              return (

                <Paper  elevation={ showButtons ? 5 : 1 }
                        onMouseEnter={ e => { this.setState({ showButtons: true }) } }
                        onMouseLeave={ e => { this.setState({ showButtons: false }) } }
                        style={{ flex: 1, height: 60, background: newColor || this.getBackground(colorItem.data), position: 'relative' }}>

                  <div style={ this.styles('iconsContainer') }>
                    <Icon title={ core.translate('Copy color to clipboard') } onClick={ this.handleCopy } style={{ ...this.styles('icon') }}>
                      { core.icons('fileCopy') }
                    </Icon>
                    <Icon title={ core.translate('Change color') } onClick={ this.openColorPicker } style={{ ...this.styles('icon'), marginLeft: 15 }}>
                      { core.icons('edit') }
                    </Icon>
                  </div>
                  <ColorPicker
                    anchorEl={ anchorEl }
                    colorItem={ colorItem }
                    handleClose={ this.handleClosePicker }
                    onColorPick={ this.onColorPick } />
                </Paper>

              )


            }
        }
    }
}
