
module.exports = {
    name: "Panel",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {},

            getDefaultProps(){
                return {};
            },
            
            getInitialState() {
                return {};
            },

            componentDidMount() {},
            
            componentDidCatch(err){},

            styles(s) {
                let styles = {
                    root: {
                        width: 'auto', 
                        height: '100%',
                        background: core.theme('colors.white'),
                    },
                }
                return(styles[s]);
            },

            render() {
                let { children, style, id } = this.props;
                return (
                    <div id={id} style={{ ...this.styles('root'), ...style }}>
                        { children }
                    </div>
                )
            }
        }
    }
};