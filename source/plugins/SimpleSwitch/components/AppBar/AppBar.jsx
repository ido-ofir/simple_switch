import { AppBar, Toolbar, Button, Icon } from '@material-ui/core/';

module.exports = {
    name: 'AppBar',
    dependencies: [],
    get() {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propTypes: {
                user: PropTypes.object
            },

            getDefaultProps(){
                return {
                    user: {
                        email:'email@test.com',
                        first_name:'first_name',
                        last_name: 'last_name'
                    }
                }
            },

            getInitialState(){
                return {
                    isFileMenuOpen: false
                }
            },

            styles(s) {
                let styles = {
                    root: {
                        background: core.theme('backgrounds.primary'),
                        position: 'relative',
                    },
                    toolbar: {
                        minHeight: 48,
                        maxHeight: 48,
                        justifyContent: 'space-between',
                    },
                    left: {
                        display: 'flex',
                        flexDirection: 'row',
                        height: 34,
                        maxHeight: 34,
                    },
                    logosWrap: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: '0px 25px 0 15px',
                        width: 270,
                        overflow: 'hidden'
                    },
                    imgLogo: {
                        width: 125,
                        marginRight: 15,
                        marginTop: '-5px',
                    },
                }

                return(styles[s]);
            },



            render() {
                return (
                    <AppBar id={'AppBar.root'} position={ 'static' } style={ this.styles('root') }>
                        <Toolbar disableGutters={ true } variant={ 'dense' } style={ this.styles('toolbar') }>
                            <div id={'AppBar.left'} style={ this.styles('left') }>
                                <div id={'AppBar.logoWrap'} style={ this.styles('logosWrap') }>
                                    <img src='/resources/images/simpleSwitchLogo.png' style={ this.styles('imgLogo') } />
                                    {/*
                                    <div style={ this.styles('textLogo') }>{core.translate('appbar.SimpleSwitch', 'Simple Switch')}</div>
                                  */}
                                </div>

                            </div>
                        </Toolbar>
                    </AppBar>
                );
            }
        };
    }
};
