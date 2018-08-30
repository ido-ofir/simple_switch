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

    dependencies: ['SimpleSwitch.Examples','SimpleSwitch.NoResults'],

    get(Examples,NoResults) {

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
                    showLocalGallery: false,
                    showOneItemLocalGallery: false,
                };
            },

            styles(s) {
                let styles = {
                    root: {

                    },
                }
                
                return(styles[s]);
            },

            render() {

                return (

                    <div id={'root.home'} style={ this.styles('root')}>
                        <Typography>
                            I am the home of your template!
                        </Typography>
                        <Examples/>
                    </div>
                )


            }
        }
    }
}
