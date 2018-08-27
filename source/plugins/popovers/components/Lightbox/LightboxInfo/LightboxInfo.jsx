
module.exports = {
    name: "LightboxInfo",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                infoWrapStyle:  PropTypes.object,
                infoInnerStyle: PropTypes.object,
                infoChildren:   PropTypes.object,
            },

            getDefaultProps(){
                return {
                    infoWrapStyle: {},
                    infoInnerStyle: {},
                    infoChildren: (<div style={{margin: 5,}}>Info Default Children</div>),
                };
            },
            
            getInitialState() {
                return {
                    showInfo: false,
                };
            },

            componentDidMount() {
                core.on('LightboxInfo.show', this.handleShowInfo);
                core.on('LightboxInfo.hide', this.handleHideInfo);
                core.on('LightboxInfo.toggle', this.handleToggleInfo);
            },
            
            componentWillUnmount() {
                core.off('LightboxInfo.show', this.handleShowInfo);
                core.off('LightboxInfo.hide', this.handleHideInfo);
                core.off('LightboxInfo.toggle', this.handleToggleInfo);
            },

            handleToggleInfo() {
                let {showInfo} = this.state;

                return showInfo ? this.handleHideInfo() : this.handleShowInfo();
            },

            handleShowInfo() {
                this.setState({showInfo: true});
            },

            handleHideInfo() {
                this.setState({showInfo: false});
            },

            styles(s) {
                let {showInfo} = this.state;
                let {infoWrapStyle, infoInnerStyle} = this.props;

                let styles = {
                    root: {
                        position: 'absolute',
                        right: showInfo ? 0 : -400,
                        width: 300,
                        height: '100%',
                        overflow: 'hidden',
                        background: core.theme('colors.white'),
                        color: core.theme('colors.gray3'),
                        zIndex: 100,
                        ...infoWrapStyle
                    },
                    inner: {
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflowX: "hidden",
                        overflowY: "auto",
                        ...infoInnerStyle
                    },
                }
                return(styles[s]);
            },

            render() {
                let {infoChildren} = this.props;

                return (
                    <div id={'LightboxInfo.root'} style={ this.styles('root') }>
                        <div id={'LightboxInfo.inner'} style={ this.styles('inner') } >
                        {infoChildren}
                        </div>
                    </div>
                )
            }
        }
    }
};