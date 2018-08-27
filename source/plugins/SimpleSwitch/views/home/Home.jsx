
import { Typography } from '@material-ui/core';

module.exports = {
    name: "Home",
    description: '',
    propTypes: {
        // name: 'string',
        // title: { type: 'string' },
        // isOpen: false,
        // onChange(){}
    },

    bindings: {
        selectedItem: ['selectedItem'],
        selectedFrom: ['selectedFrom'],
        initLoading: ['initLoading']
    },

    dependencies: ['SimpleSwitch.NoResults','SimpleSwitch.Loader', 'popovers.Gallery'],

    get(NoResults, Loader, Gallery) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },
            getDefaultProps(){
                return {

                };
            },
            componentDidMount() {
                this.isUnmounted = false;
                // setTimeout(()=>{
                // }, 5000)
            },
            componentWillUnmount() {
                this.isUnmounted = true;

            },

            getInitialState() {
                return {
                    error: null,
                    showLocalGallery: false,
                };
            },

            openPopup(){
                core.plugins.popovers.openPopup({
                    title: core.translate('Popup test', 'Popup test'),
                    body: <div>i am popup test :) </div>,
                    bodyStyle: { minWidth: 530, minHeight: 'unset', padding: '0px 22px' },
                    showButtons: false,
                    okButton: {
                        btnTitle: null,
                        btnFunc: null
                    }
                });
            },

            openLightbox() {
                core.plugins.popovers.openLightbox();
            },

            openGallery() {
                core.plugins.popovers.openLightbox({
                    title: {
                        title: 'Gallery',
                        hasInfo: false,
                    },
                    children: <Gallery/>,
                });
            },

            toggleLocalGallery() {
                let {showLocalGallery} = this.state;
                this.setState({showLocalGallery: !showLocalGallery});
            },

            renderGallery() {
                let {showLocalGallery} = this.state;
                if (!showLocalGallery) return null;

                return (
                    <div  style={{
                        backgroundColor: core.theme('backgrounds.lightbox'),
                        width: "100%",
                        height: 600,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        overflow: 'hidden',
                        color: core.theme('colors.white'),
                    }} >
                        <Gallery />
                    </div>
                );
            },

            render() {

                return (

                    <div id={'root.home'} style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: 15 }}>
                        <Typography>
                            I am the home of your template!
                        </Typography>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openPopup }>popup</a>
                        </Typography>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openLightbox }>lightbox</a>
                        </Typography>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openGallery }>gallery</a>
                        </Typography>
                        <Typography>
                            <span>I am a <a href="/#/home" onClick={ this.toggleLocalGallery }>gallery</a> too.</span>
                        </Typography>
                        { this.renderGallery() }
                        <span>123</span>
                    </div>
                )


            }
        }
    }
}
