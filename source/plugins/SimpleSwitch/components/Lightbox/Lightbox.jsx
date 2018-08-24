

module.exports = {
    name: "Lightbox",
    description: '',
    dependencies: ['SimpleSwitch.LightboxTitleBar', 'SimpleSwitch.LightboxInfo'],    

    get(LightboxTitleBar, LightboxInfo) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                isOpen:   PropTypes.bool.isRequired,
                hasTitle: PropTypes.bool,
                hasInfo:  PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    isOpen: false,
                    hasTitle: true,
                    // hasInfo: true,
                    hasInfo: false,
                    children: 'children',
                };
            },
            
            getInitialState() {
                return {
                    isOpen: false,
                    showInfo: false,
                };
            },

            componentDidMount() {
                core.on('Lightbox.showInfo', this.handleShowInfo);
                core.on('Lightbox.hideInfo', this.handleHideInfo);
                core.on('Lightbox.toggleInfo', this.handleToggleInfo);
            },
            
            componentWillUnmount() {
                core.off('Lightbox.showInfo', this.handleShowInfo);
                core.off('Lightbox.hideInfo', this.handleHideInfo);
                core.off('Lightbox.toggleInfo', this.handleToggleInfo);
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.isOpen !== this.state.isOpen) {
                    this.setState({isOpen: nextProps.isOpen});
                };
            },

            handleToggleInfo() {
                let {showInfo} = this.state;
                if (showInfo === true) this.handleHideInfo();
                else this.handleShowInfo();
            },

            handleShowInfo() {
                this.setState({showInfo: true});
            },

            handleHideInfo() {
                this.setState({showInfo: false});
            },

            styles(s) {
                let styles = {
                    root: {
                        position: 'absolute',
                        zIndex: 1500,
                        width: '100%', 
                        height: '100%',
                        background: core.theme('backgrounds.lightbox'),
                        overflow: 'hidden',
                    },
                    inner: {
                        position: 'relative',
                        width: '100%', 
                        height: '100%',
                        overflow: 'hidden',
                    },
                    bodyStyle: {
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%', 
                        height: '100%',
                        color: core.theme('colors.white'),
                    },
                    children: {
                        width: '100%',
                        margin: 15,
                    },
                }
                return(styles[s]);
            },
            
            render() {
                let { isOpen, showInfo } = this.state;
                let {childern, hasTitle, hasInfo} = this.props;

                if (!isOpen) return null;

                return (
                    <div id={'Lightbox.root'} style={ this.styles('root') }>
                        <div id={'Lightbox.inner'} style={ this.styles('inner') }>
                            <LightboxTitleBar hasTitle={ hasTitle } hasInfo={ hasInfo } />
                            <div id={'Lightbox.body'} style={ this.styles('bodyStyle') } >
                                <div id={'Lightbox.children'} style={ this.styles('children') }>
                                    { childern }
                                </div>
                                <LightboxInfo hasInfo={ hasInfo } showInfo={ showInfo } />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
};