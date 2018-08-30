import { Responsive, WidthProvider } from 'react-grid-layout';

module.exports = {
    name: 'GridManage',
    dependencies: [],
    
    get() {
        var core = this;
        var { React, PropTypes } = core.imports;
        
        const ResponsiveReactGridLayout = WidthProvider(Responsive);
        
        return {

            propsTypes: {
            },

            getDefaultProps(){
                return {};
            },

            getInitialState() {
                return {};
            },
            
            componentWillReceiveProps(nextProps) {
            },

            componentWillMount() {
            },

            componentDidMount() {
            },
            
            componentWillUnmount() {
            },

            styles(s) {
                let styles = {
                    root: {
                        color: this.theme('backgrounds.default'),
                    },
                
                }
                
                return(styles[s]);
            },
            
            render() {
                return (
                    <div style={ this.styles('root') }>
                        Hello!
                    </div>
                );
            }
        };
    }
};
