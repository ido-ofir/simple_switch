
module.exports = {
    name: "CssExamples",
    description: '',
    propTypes: {
        // name: 'string',
        // title: { type: 'string' },
        // isOpen: false,
        // onChange(){}
    },

    bindings: {

    },

    dependencies: [],

    get() {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {

            },

            getDefaultProps(){
                return {

                };
            },

            getInitialState() {
                return {

                };
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            styles(s) {
                let styles = {
                    root: {
                        backgroundColor: 'grey',
                        color: 'purple',
                        width: '100%',
                        height: '100vh',
                    },

                }
                
                return(styles[s]);
            },

            render() {

                return (

                    <div style={ this.styles('root')}>
                        <div ></div>
                        <div></div>
                    </div>
                )


            }
        }
    }
}
