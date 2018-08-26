module.exports = {
    name: "Lightbox",
    description: '',
    dependencies: ['popovers.LightboxTitleBar', 'popovers.LightboxInfo'],    

    get(LightboxTitleBar, LightboxInfo) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                title:         PropTypes.object,
                info:          PropTypes.object,
                rootStyle:     PropTypes.object,
                innerStyle:    PropTypes.object,
                bodyStyle:     PropTypes.object,
                childrenStyle: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    title: <LightboxTitleBar hasInfo={true}/>,
                    info: <LightboxInfo />,
                    children: <div>Lightbox default children</div>,
                    rootStyle: {},
                    innerStyle: {},
                    bodyStyle: {},
                    childrenStyle: {},
                };
            },
            
            getInitialState() {
                return {
                    showLightbox: false,
                };
            },

            componentDidMount() {
                core.on('Lightbox.open', this.openLightbox);
                core.on('Lightbox.close', this.closeLightbox);
            },
            
            componentWillUnmount() {
                core.off('Lightbox.open', this.openLightbox);
                core.off('Lightbox.close', this.closeLightbox);
            },

            styles(s) {
                let {rootStyle, innerStyle, bodyStyle, childrenStyle} = this.props;
                
                let styles = {
                    root: {
                        position: 'absolute',
                        zIndex:  1500,
                        width:  '100%', 
                        height: '100%',
                        background: core.theme('backgrounds.lightbox'),
                        overflow: 'hidden',
                        ...rootStyle
                    },
                    inner: {
                        position: 'relative',
                        width: '100%', 
                        height: 'calc(100% - 15px)',
                        overflow: 'hidden',
                        ...innerStyle
                    },
                    bodyStyle: {
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%', 
                        height: '100%',
                        color: core.theme('colors.white'),
                        ...bodyStyle
                    },
                    children: {
                        width: '100%',
                        margin: 15,
                        position: 'relative',
                        ...childrenStyle
                    },
                }
                return(styles[s]);
            },

            openLightbox() {
                this.setState({showLightbox: true});
            },

            closeLightbox() {
                this.setState({showLightbox: false});
            },
            
            render() {
                let { showLightbox } = this.state;
                let { children, title, info } = this.props;

                if (!showLightbox) return null;

                return (
                    <div id={'Lightbox.root'} style={ this.styles('root') }>
                        <div id={'Lightbox.inner'} style={ this.styles('inner') }>
                            <div id={'Lightbox.title'} >
                                { title }
                            </div>
                            <div id={'Lightbox.body'} style={ this.styles('bodyStyle') } >
                                <div id={'Lightbox.children'} style={ this.styles('children') }>
                                    { children }
                                </div>
                                { info }
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
};