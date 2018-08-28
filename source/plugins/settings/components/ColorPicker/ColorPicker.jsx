
import { Typography, Paper, Icon, Button, Popover  } from '@material-ui/core';
import { SketchPicker  } from 'react-color';
require('./colorPicker.scss')
module.exports = {
    name: "ColorPicker",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper', 'SimpleSwitch.NoResults', 'SimpleSwitch.Loader', 'SimpleSwitch.ExpandingPanel'],

    get(Helper, NoResults, Loader, ExpandingPanel) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                colorItem: PropTypes.object,
                anchorEl: PropTypes.object,
                handleClose: PropTypes.func,
                onColorPick: PropTypes.func,
            },

            getInitialState() {
              return {
                pickedColor: '#3ab3ab'
              };
            },

            getDefaultProps(){
                return {
                  colorItem: { title: 'test' },
                  anchorEl: null
                };
            },

            componentDidMount() {
              let { colorItem } = this.props;
              this.setState({ pickedColor: colorItem && colorItem.data ? colorItem.data : '#3ab3ab'  });
              this.isUnmounted = false;
            },

            componentWillReceiveProps(nextProps) {
              let { colorItem } = nextProps;

              if (colorItem.data !== this.props.colorItem.data) {
                this.setState({ pickedColor: colorItem.data  });
              }
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            handleClose(){
              if (this.props.handleClose) this.props.handleClose()
            },

            handleColorPick(){
              if (this.props.onColorPick) this.props.onColorPick(this.state.pickedColor)
            },

            handleChangeComplete(color, e){
              this.setState({ pickedColor: color.hex });
            },

            render() {
              let { anchorEl, colorItem } = this.props;
              let { pickedColor } = this.state;

              const open = Boolean(anchorEl);

              return (

                <Popover
                  id="simple-popper"
                  open={open}
                  PaperProps={{ style: { padding: 15 } }}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center', }}>

                  <Typography style={{ fontSize: '14px', fontWeight: 500 }}>
                    { colorItem.title }
                  </Typography>

                  <div style={{ margin: '15px 0' }}>
                    <SketchPicker color={ pickedColor } onChangeComplete={ this.handleChangeComplete } />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={ this.handleColorPick } color="primary" size={ 'small' } >{core.translate('pick')}</Button>
                    <Button onClick={ this.handleClose } color="secondary" size={ 'small' } >{core.translate('cancel')}</Button>
                  </div>

                </Popover>

              )


            }
        }
    }
}
