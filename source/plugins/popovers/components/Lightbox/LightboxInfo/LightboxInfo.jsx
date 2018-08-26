
module.exports = {
    name: "LightboxInfo",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                rootStyle:  PropTypes.object,
                innerStyle: PropTypes.object,
                children:   PropTypes.object,
            },

            getDefaultProps(){
                return {
                    rootStyle: {},
                    innerStyle: {},
                    children: (<div style={{margin: 5,}}>Info Default Children</div>),
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
                let {rootStyle, innerStyle} = this.props;

                let styles = {
                    root: {
                        position: 'absolute',
                        right: showInfo ? 0 : -400,
                        width: 300,
                        height: '100%',
                        overflow: 'hidden',
                        background: core.theme('colors.white'),
                        color: core.theme('colors.gray3'),
                        ...rootStyle
                    },
                    inner: {
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflowX: "hidden",
                        overflowY: "auto",
                        ...innerStyle
                    },
                }
                return(styles[s]);
            },

            render() {
                let {children} = this.props;

                return (
                    <div id={'LightboxInfo.root'} style={ this.styles('root') }>
                        <div id={'LightboxInfo.inner'} style={ this.styles('inner') } >
                            {children}
                        </div>
                    </div>
                )
            }
        }
    }
};