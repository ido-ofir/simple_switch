
import {
    IconButton,
    Icon,
    CircularProgress,

  } from '@material-ui/core/';

module.exports = {
    name: "ActionButton",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper'],

    get(Helper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                action: PropTypes.string.isRequired,
                cb: PropTypes.func.isRequired,
                params: PropTypes.object,
                noCaution: PropTypes.bool,
                caution: PropTypes.object,
                disabeld: PropTypes.bool,
                tooltipText: PropTypes.string,
                icon: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    size: 20,
                    noCaution: false,
                    caution: {
                        title: core.translate('action'),
                        text: core.translate('are you sure?')
                    },
                    params: {},
                    disabeld: false,
                    tooltipText: core.translate('Folders'),
                    icon: core.icons('Folders'),
                    color: core.theme('colors.actionIcons')

                };
            },

            getInitialState() {

                return {
                    loading: false
                };
            },

            componentDidMount () {
                this.isUnmounted = false;
            },

            componentWillUnmount () {
                this.isUnmounted = true;
            },

            Caution(e){
                let { caution, cb, disabeld, noCaution } =  this.props;
                let { title, text } = caution;

                e.stopPropagation();

                if(disabeld) return
                if(noCaution){
                    Helper.safeState(this, { loading: true });
                    this.runAction();
                    return
                }

                core.plugins.popovers.Caution(text,title,(sure)=>{
                    if(!sure){
                        cb(false);
                        return;
                    }

                    Helper.safeState(this, { loading: true });
                    this.runAction();
                })
            },

            runAction(){
                let { action, cb, params } =  this.props;

                core.plugins.SimpleSwitch.run(action, params).then( (result) => {
                    Helper.safeState(this, { loading: false });
                    cb(true, result);
                }).catch(()=>{
                    cb(false);
                    Helper.safeState(this, { loading: false });
                })
            },

            renderIcon(){
                let { loading } = this.state;
                let { icon,  size } = this.props;


                if(loading){
                    return(
                        <CircularProgress
                            size={ size }
                            thickness={ 4 }
                            color={ 'primary' }
                        />
                    )
                }

                return (
                    <Icon style={this.styles('icon')}>
                          { icon }
                    </Icon>
                )
            },

            styles(s){
                let { disabeld, size, color } = this.props;
                let cursor = disabeld ? 'not-allowed' : 'pointer'

                const styles = {
                    button: {
                        width:size*1.5 ,
                        height:size*1.5 ,
                        cursor:cursor
                    },
                    icon: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: size,
                        height: size,
                        fontSize: size,
                        color: !disabeld ? color : core.theme("colors.disable")
                    }

                }

                return(styles[s]);
            },


            render() {

                let { disabeld, tooltipText } = this.props;

                return (
                        <IconButton

                            style= { this.styles('button') }
                            disabeld= { disabeld.toString() }
                            onClick={ this.Caution } >

                        <div title={ tooltipText } >
                            { this.renderIcon() }
                        </div>

                    </IconButton>
                )


            }
        }
    }
}
