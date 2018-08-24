import { AppBar, Toolbar, Icon, IconButton } from '@material-ui/core/';

module.exports = {
    name: "LightboxTitleBar",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                hasInfo: PropTypes.bool.isRequired,
                hasTitle: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    hasInfo: true,
                    hasTitle: true
                };
            },
            
            getInitialState() {
                return {};
            },

            styles(s) {
                let styles = {
                    root: {
                        background: core.theme('colors.primary'),
                        position: 'relative',
                        paddingLeft: 15,
                    },
                    toolbar: {
                        minHeight: 48,
                        maxHeight: 48,
                        justifyContent: 'space-between',
                    },
                    buttons: {
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 5,
                        top: 0,
                        width: 'auto', 
                        paddingRight: 0,
                        height: 40
                    },
                    closeButton: {
                        height: 30,
                        width: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    closeIcon: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 24,
                    },
                }
                return(styles[s]);
            },

            infoButton() {
                let {hasInfo} = this.props;
                let title = core.translate('Info Panel');

                if (!hasInfo) return null;

                return (
                    <IconButton style={ this.styles('closeButton')} onClick={ ()=>{core.emit('Lightbox.toggleInfo')} }>
                        <Icon key={ 'infoPanel' } title={ title } style={ this.styles('closeIcon')}>
                            { core.icons('info') }
                        </Icon>
                    </IconButton>
                );
            },

            closeLightbox() {
                let title = core.translate('Close Lightbox');

                return (
                    <IconButton style={ this.styles('closeButton')} onClick={ ()=>{core.emit('Root.closeLightbox')} }>
                        <Icon key={ 'close' } title={ title } style={ this.styles('closeIcon')}>
                            { core.icons('close') }
                        </Icon>
                    </IconButton>
                );
            },

            actionButtons() {
                let { buttons } = this.props;
                return(
                    <div style={ this.styles('buttons') } >
                        { buttons }
                        { this.infoButton() }
                        { this.closeLightbox() }
                    </div>
                );
            },

            render() {
                let {hasTitle} = this.props;

                if (!hasTitle) return null;

                let title = core.translate('Default Title');
                
                return (
                    <AppBar id={'LightboxTitleBar.root'} position={ 'static' } style={ this.styles('root') }>
                        <Toolbar id={'LightboxTitleBar.toolbar'} disableGutters={ true } variant={ 'dense' } style={ this.styles('toolbar') }>
                            <div id={'LightboxTitleBar.title'}>{ title }</div>
                            <div id={'LightboxTitleBar.actionButtons'}>{ this.actionButtons() }</div>
                        </Toolbar>
                    </AppBar>
                )
            }
        }
    }
};