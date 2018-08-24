import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import DialogTitle from '@material-ui/core/DialogTitle';

module.exports = {
    name: 'Popup',
    description: '',
    propTypes: {},
    dependencies: ['popovers.PopupHandler'],
    get(popupHandler) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            getInitialState() {
                return {
                    open: false,
                    title: core.translate('noTitle', 'No Title'),
                    body: ( 
                        <div>{core.translate('noContent', 'No Content')}</div>
                    ),
                    bodyStyle: {},
                    btnTitle: core.translate('ok','Ok'), 
                    btnFunc: ()=>{console.log('No action')},
                };
            },

            componentDidMount() {
                core.on('Popup',this.handleClickOpen);
                core.on('Popup.close',this.handleClose);
            },

            componentWillUnmount() {
                core.off('Popup',this.handleClickOpen);
                core.off('Popup.close',this.handleClose);
            },

            handleClickOpen(popupData) {
                if(!popupData) {
                    this.setState({ open: true });
                    return
                }

                let {title, body, bodyStyle, btnTitle, btnFunc } = popupData;

                this.setState({ title, body, bodyStyle, btnTitle, btnFunc });
                this.setState({ open: true });
            },

            handleClose() {
                popupHandler.clearData();  
                this.setState({ open: false });
            },

            okFunc(data){
                let { btnFunc } = this.state;
                
                btnFunc(data);
            },

            styles(s, isDisabled) {
                let {bodyStyle} = this.state;
                let styles = {
                    root: {
                        minWidth: 500,
                        minHeight: 250,
                        position: 'relative',
                        ...bodyStyle
                    },

                    okButton: {
                        background: isDisabled ? core.theme('colors.gray2'):core.theme('backgrounds.blue'),
                        minHeight: 30,
                        maxHeight: 30,
                        width: 72,
                        color: isDisabled ? core.theme('colors.dark') : core.theme('colors.white'),
                        pedding: 0,
                        fontSize: 12,
                        borderRadius: 2

                    },

                    cancelButton: {
                        minHeight: 30,
                        maxHeight: 30,
                        width: 72,
                        marginRight: 10,
                        color: core.theme('colors.subHeader'),
                        pedding: 0,
                        fontSize: 12,
                        borderRadius: 2
                    },

                    buttonsCont: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        // margin: 20
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px',
                    },
                    popHeader: { 
                        padding: '0 15px', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 40,  
                        background: core.theme('colors.fusionPrimary')
                    }

                }
                return(styles[s]);
            },
            
            renderButtons(popup){
                let { btnTitle } = this.state;
                return (
                    <div style={this.styles('buttonsCont')} >
                        <Button onClick={ this.handleClose } style={this.styles('cancelButton')} color="secondary">
                            { core.translate('Cancel') }
                        </Button>
                        {
                            (!btnTitle) ? null :
                            <Button onClick={ ()=>{ this.okFunc(popup.data) } } style={this.styles('okButton', popup.disable)} disabled={popup.disable} autoFocus>
                                { btnTitle }
                            </Button>
                        }
                    </div>
                );
            },

            render() {
                let {title, body } = this.state;

                return core.bind(['plugins', 'popovers', 'popup'], (popup)=>{

                    return (
                        <Dialog
                            open={this.state.open || false}
                            onClose={this.handleClose}
                            maxWidth={false}
                            PaperProps={{ square: true, style: { borderRadius: 2, height: 360 } }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                           <DialogTitle  
                                disableTypography={ true }
                                style={ this.styles('popHeader') } id="alert-dialog-title">
                                <Typography style={{ fontWeight: 500, fontSize: 13, color: core.theme('colors.white'), textTransform: 'uppercase', margin: 0, fontWeight: 600 }} >
                                { title }
                                </Typography>
                                <Icon style={{ color: core.theme('colors.white'), cursor: 'pointer' }} onClick={this.handleClose} title={core.translate('close')}>
                                    { core.icons('close') }
                                </Icon>
                            </DialogTitle>
                            <DialogContent style={ this.styles('root') }>
                                { body }
                            </DialogContent>

                                { this.renderButtons(popup) }

                        </Dialog>
                    );

                });

              
            }
        };
    }
};