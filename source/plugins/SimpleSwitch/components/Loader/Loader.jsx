
import { CircularProgress } from '@material-ui/core/';
  
module.exports = {
    name: "Loader",
    description: '',
    propTypes: {
    },
    dependencies: [],    
    get() {
        
        var core = this;
        var { React, PropTypes } = core.imports;
  
        return {
            propsTypes: {
                size: PropTypes.string,
                show: PropTypes.bool,
                color: PropTypes.string,
                style: PropTypes.object,
            },
            
            getDefaultProps(){
                return {
                  size: 'small',
                  color: 'primary', // ["primary","secondary","inherit"]
                  show: true
                }
            },
            
            getInitialState() {
  
                return {
                    error: null
                };
            },
            
            getSize(size){
                switch (size) {
                    case 'tiny':
                        return 15;
                    case 'xtsmall':
                        return 20;
                    case 'small':
                        return 30;
                    case 'midMedium':
                        return 40;
                    case 'large':
                        return 70;

                    case 'medium':
                    default:
                        return 50;
                }
            },
         

  
            render() {
                let {show, style, size, color} = this.props;

                if (!show){
                  return null;
                }
         
                let wrapper= {
                 display:'flex',
                 alignItems:'center',
                 justifyContent:'center',
                 position: 'absolute',
                 top:0,
                 bottom:0,
                 left:0,
                 right:0,
                 zIndex: 1
               }
         
                return (
                   <div style={{...wrapper, ...style}}>
                     <CircularProgress size={this.getSize(size)} color={color} thickness={ size === 'xtsmall' ? 2 : 3 } style={this.props.loaderStyle} />
                   </div>
                );
            }        
        }
    }
}