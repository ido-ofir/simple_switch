
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
                        width: '100%',
                        height: 'calc( 100vh - 48px )',
                        display: 'flex',
                        flexDirection: 'row',
                    },
                    menuBar:{
                        height: '100%',
                        backgroundColor: 'grey',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }

                }
                
                return(styles[s]);
            },

            render() {

                return (

                    <div style={ this.styles('root')}>
                        <div style={this.styles('menuBar')}>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                            </ul>
                        </div>
                        <div></div>
                    </div>
                )


            }
        }
    }
}
