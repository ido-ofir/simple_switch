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
                hasInfo:      PropTypes.bool,
                title:        PropTypes.string,
                buttons:      PropTypes.array,
                rootStyle:    PropTypes.object,
                toolbarStyle: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    hasInfo: false,
                    title: core.translate('Lightbox Default Title'),
                    buttons: [],
                    rootStyle: {},
                    toolbarStyle: {},
                };
            },
            
            styles(s) {
                let {rootStyle, toolbarStyle} = this.props;

                let styles = {
                    root: {
                        background: core.theme('colors.primary'),
                        position: 'relative',
                        paddingLeft: 15,
                        ...rootStyle,
                    },
                    toolbar: {
                        minHeight: 48,
                        maxHeight: 48,
                        justifyContent: 'flex-start',
                        ...toolbarStyle,
                    },
                    buttons: {
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 5,
                        top: 5,
                        width: 'auto', 
                        paddingRight: 0,
                        height: 40
                    },
                    buttonStyle: {
                        height: 30,
                        width: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    iconStyle: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 24,
                    },
                }
                return(styles[s]);
            },

            buttonToggleInfo() {
                let {hasInfo} = this.props;
                let title = core.translate('Info Panel');

                if (!hasInfo) return null;

                return (
                    <IconButton style={ this.styles('buttonStyle')} onClick={ ()=>{core.emit('LightboxInfo.toggle')} }>
                        <Icon key={ 'infoPanel' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('info') }</Icon>
                    </IconButton>
                );
            },

            buttonCloseLightbox() {
                let title = core.translate('Close Lightbox');

                return (
                    <IconButton style={ this.styles('buttonStyle')} onClick={ ()=>{core.emit('Lightbox.close')} }>
                        <Icon key={ 'close' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('close') }</Icon>
                    </IconButton>
                );
            },

            closeButton() {
                return(
                    <div style={ this.styles('buttons') } >
                        { this.buttonCloseLightbox() }
                    </div>
                );
            },

            actionButtons() {
                let { buttons } = this.props;

                let rightButtonsStyle = {...this.styles('buttons')};
                    rightButtonsStyle.left = 'auto';
                    rightButtonsStyle.right = 25;

                return(
                    <div style={ rightButtonsStyle } >
                        { buttons }
                        { this.buttonToggleInfo() }
                    </div>
                );
            },

            render() {
                let {title} = this.props;
                
                return (
                    <AppBar id={'LightboxTitleBar.root'} position={ 'static' } style={ this.styles('root') }>
                        <Toolbar id={'LightboxTitleBar.toolbar'} disableGutters={ true } variant={ 'dense' } style={ this.styles('toolbar') }>
                            <div id={'LightboxTitleBar.title'} style={{ paddingLeft: 50, }}>{ title }</div>
                            <div id={'LightboxTitleBar.closeButton'}>{ this.closeButton() }</div>
                            <div id={'LightboxTitleBar.actionButtons'}>{ this.actionButtons() }</div>
                        </Toolbar>
                    </AppBar>
                )
            }
        }
    }
};