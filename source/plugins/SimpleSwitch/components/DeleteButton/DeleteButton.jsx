
import { 
    Button,
    Icon,
    CircularProgress,
    Tooltip

  } from '@material-ui/core/';

module.exports = {
    name: "DeleteButton",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper'],    
    
    get(Helper) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                action: PropTypes.string.isRequired,
                cb: PropTypes.func.isRequired,
                onClick: PropTypes.func,
                params: PropTypes.object,
                caution: PropTypes.object,
                disabeld: PropTypes.bool,
                tooltipText: PropTypes.string,
                tooltipPosition: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    size: 20,
                    caution: {
                        title: core.translate('Delete'),
                        text: core.translate('are you sure you want to delete?')
                    },
                    params: {},
                    disabeld: false,
                    tooltipText: core.translate('Delete'),
                    tooltipPosition: 'top',
                    color: core.theme("colors.actionIcons") 

                };
            },
            
            getInitialState() {

                return {
                    deleting: false
                };
            },
 
            Caution(){
                let { caution, action, cb, params, disabeld } =  this.props;
                let { title, text } = caution;

                if(disabeld) return

                core.plugins.popovers.Caution(text,title,(sure)=>{
                    if(!sure){
                        cb(false)
                        return;
                    }

                    Helper.safeState(this, { deleting: true });
                    
                    core.plugins.SimpleSwitch.run(action, params).then( (result) => {
                        Helper.safeState(this, { deleting: false });
                        cb(true, result);
                    }).catch(()=>{ 
                        Helper.safeState(this, { deleting: false });
                        cb(false)
                    })

                })
            },

            renderIcon(){
                let { deleting } = this.state;
                let { disabeld } = this.props;
                let { size, color } = this.props;

                let style = {
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: size, 
                    height: size, 
                    fontSize: size,
                    color: !disabeld ? color || core.theme("colors.gray3") : core.theme("colors.disable")
                }

                if(deleting){
                    return(     
                        <CircularProgress
                            size={ size }
                            thickness={ 4 }
                            color={ 'primary' }
                        />
                    )
                }
                
                return (
                    <Icon style={style}>
                          { core.icons('delete') } 
                    </Icon>
                )
            },

            render() {

                let { disabeld,  tooltipText, tooltipPosition } = this.props;
                let cursor = disabeld ? 'not-allowed' : 'pointer'

                return (
                        <Button 
                            size={ "small" } 
                            mini={ true } 
                            style= {{ ...styles.button, cursor:cursor }} 
                            disabeld= { disabeld.toString() }
                            onClick={ this.Caution } >

                        <div title={ tooltipText }  >
                            { this.renderIcon() }
                        </div>

                    </Button>
                )


            }            
        }
    }
}

let styles = {
    button: {
        minWidth: 32,
        borderRadius: '50%'
    }
}

