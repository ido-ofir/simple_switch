
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
                    showOneItemLocalGallery: false,
                };
            },

            styles(s) {
                let styles = {
                    root: {
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 15,
                        overflowX: "auto",
                    },
                }
                
                return(styles[s]);
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

            toggleOneItemLocalGallery() {
                let {showOneItemLocalGallery} = this.state;
                this.setState({showOneItemLocalGallery: !showOneItemLocalGallery});
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

            renderOneItemGallery() {
                let {showOneItemLocalGallery} = this.state;

                if (!showOneItemLocalGallery) return null;

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
                        <Gallery gallery={[{ 
                            id: '19487501bat_metal', 
                            name: 'bat_metal', 
                            url: '/resources/images/default_gallery/bat_metal.jpg',
                            info: { 
                                title: 'bat_metal', 
                                body: 'This is a example for bat_metal info body text.' 
                            }
                        }]}/>
                    </div>
                );
            },

            renderPopup() {
                return(
                    <div id={'renderPopup'}>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openPopup }>popup</a>
                        </Typography>
                    </div>
                );
            },

            renderLightbox() {
                return(
                    <div id={'renderLightbox'}>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openLightbox }>lightbox</a>
                        </Typography>
                    </div>
                );
            },

            renderLightboxGallery() {
                return(
                    <div id={'renderLightboxGallery'}>
                        <Typography>
                            I am a <a href="/#/home" onClick={ this.openGallery }>gallery</a> at lightbox
                        </Typography>
                    </div>
                );
            },

            renderLocalGallery() {
                return(
                    <div id={'renderLocalGallery'}>
                        <Typography>
                            <span>I am a local <a href="/#/home" onClick={ this.toggleLocalGallery }>gallery</a></span>
                        </Typography>
                        { this.renderGallery() }
                    </div>
                );
            },

            renderLocalOneItemGallery() {
                return(
                    <div id={'renderLocalOneItemGallery'}>
                        <Typography>
                            <span>I am a one item local <a href="/#/home" onClick={ this.toggleOneItemLocalGallery }>gallery</a></span>
                        </Typography>
                        { this.renderOneItemGallery() }
                    </div>
                );
            },

            render() {

                return (

                    <div id={'root.home'} style={ this.styles('root')}>
                        <Typography>
                            I am the home of your template!
                        </Typography>
                        { this.renderPopup() }
                        { this.renderLightbox() }
                        &nbsp;<br/>
                        { this.renderLightboxGallery() }
                        { this.renderLocalGallery() }
                        { this.renderLocalOneItemGallery() }
                        &nbsp;<br/>
                        <span>123</span>
                    </div>
                )


            }
        }
    }
}
