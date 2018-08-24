
import { 
    Icon,Typography
  } from '@material-ui/core/';


module.exports = {
    name: "NoResults",
    description: '',
    propTypes: {},
    dependencies: [],    
    

    get() {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    mainText: core.translate('No Results'),
                    text: null,
                    size: 3
                };
            },
            
            getInitialState() {

                return {
                    
                };
            },

            componentDidMount() {
                      
            },
            
            componentDidCatch(err){
            
            },

            renderNoResults(){
                let { size, mainText } = this.props;
                let fontSize = size *6;
                
    
                return(
                    <Typography style={{fontSize:fontSize ,color:core.theme('colors.gray4')}}>
                        { mainText }
                    </Typography>
                )
            },

            renderText(){
                let { text, size } = this.props;

                if(!text) return
                let fontSize = size *3;

                return(
                    <Typography style={{ fontSize:fontSize, color:core.theme('colors.gray6') }}>
                        { text }
                    </Typography>
                )
            },

            render() {
                return (
                    <div style={{ ...styles.wrapper, ...this.props.style }}>
                        <div style={styles.flexColumn}>
                            { this.renderNoResults() }
                            { this.renderText() }
                        </div>
                    </div>
                )
            } 

        }
    }
}

let styles = {
    wrapper: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },

    flexColumn: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

