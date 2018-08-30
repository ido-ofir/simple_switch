
import { Typography, Input, InputAdornment, Icon  } from '@material-ui/core';

module.exports = {
    name: "SavePopup",
    description: '',
    propTypes: {},
    dependencies: [],

    get() {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
              handleFileName: PropTypes.func,
            },

            getInitialState() {
              return {
                fileName: ''
              };
            },

            handleChange(event){
              var str = event.target.value;
              if (this.props.handleFileName) {
                this.props.handleFileName(str);
              }
              this.setState({ fileName: str })
            },

            render() {
              return (

                <div style={{ height: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: '50px' }}>
                  <Input
                    id={ 'input-fileName' }
                    inputProps={{ style: { fontSize: 14 } }}
                    fullWidth={ true }
                    required={ true }
                    value={ this.state.fileName }
                    onChange={ this.handleChange }
                    autoFocus={ true }
                    placeholder={ core.translate('fileName', 'File Name')  }
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon style={{ fontSize: 16, color: core.theme('colors.gray') }}>{core.icons('edit')}</Icon>
                      </InputAdornment>
                    }
                  />
                  <Typography style={{ color: core.theme('colors.gray'), fontSize: 12, marginTop: 10 }}>
                    {'*'+core.translate('emptySpaces','Empty spaces will be saved as underscore')}
                  </Typography>

                </div>

              )


            }
        }
    }
}
