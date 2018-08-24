
import { Typography } from '@material-ui/core';

module.exports = {
    name: "Home",
    description: '',
    propTypes: {
        // name: 'string',
        // title: { type: 'string' },
        // isOpen: false,
        // onChange(){}
    },

    bindings: {
        selectedItem: ['selectedItem'],
        selectedFrom: ['selectedFrom'],
        initLoading: ['initLoading']
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
                // setTimeout(()=>{
                // }, 5000)
            },
            componentWillUnmount() {
                this.isUnmounted = true;

            },

            getInitialState() {
                return {
                    error: null,
                };
            },
            openPopup(){
                  core.plugins.popovers.openPopup({
                      title: core.translate('Popup test', 'Popup test'),
                      body: <div>i am popup test :) </div>,
                      bodyStyle: { minWidth: 530, minHeight: 'unset', padding: '0px 22px' },
                      showButtons: false,
                      okButton: {
                          btnTitle: null,
                          btnFunc: null
                      }
                  });

            },
            render() {


                return (

                    <div id={'root.home'} style={{ height: '100%', width: '100%', display: 'flex', padding: 15 }}>
                      <Typography>
                        I am the home of your <a href="/#/home" onClick={ this.openPopup }>template!</a>
                      </Typography>
                    </div>
                )


            }
        }
    }
}
