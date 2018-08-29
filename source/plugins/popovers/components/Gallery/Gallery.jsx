import { Icon, IconButton, CircularProgress } from '@material-ui/core/';

module.exports = {
    name: "Gallery",
    description: '',
    dependencies: ['popovers.Thumbnails', 'popovers.GalleryDots'],

    get(Thumbnails, GalleryDots) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            propsTypes: {
            },

            getDefaultProps(){
                return {};
            },

            componentWillReceiveProps(nextProps) {
                this.setStateFromProps(nextProps);
            },

            getInitialState() {
                let defaultGallery = this.defaultGallery();
                
                return {
                    selectedId: defaultGallery[0].id,
                    gallery: defaultGallery,
                    downloading: false,
                    
                    // selector: '', // '' or 'dots' or 'thumbnails'
                    // selector: 'dots', // '' or 'dots' or 'thumbnails'
                    selector: 'thumbnails', // '' or 'dots' or 'thumbnails'

                    showArrows: true,
                    showSelector: true,
                    showCounter: true,
                    showDownload: true,
                    showInfo: false,
                };
            },

            componentWillMount() {
                this.setStateFromProps(this.props);
            },

            componentDidMount() {
                document.addEventListener("keydown", this.keyboardKeyHandle);
                document.addEventListener("onkeydown", this.keyboardKeyHandle); // for non alphanumeric keys
            },
            
            componentWillUnmount() {
                document.removeEventListener("keydown", this.keyboardKeyHandle); 
                document.removeEventListener("onkeydown", this.keyboardKeyHandle);
            },

            styles(s) {
                let {gallery, downloading, selector, showSelector, showArrows} = this.state;
                let noThumbnails = Boolean(!showSelector || gallery.length === 1);
                let noArrows = Boolean(!showArrows || gallery.length === 1);
                let SELECTOR_HEIGHT = (selector === 'dots') ? 39
                                    : (selector === 'thumbnails') ? 150
                                    : 0;

                let styles = {
                    root: {
                        width: '100%',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        overflow: 'hidden',
                        display:'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    },
                    actionButtons: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: core.theme('transparent.black_40'),
                        borderRadius: 3,
                        padding: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                    },
                    counter: {
                        borderRadius: 3,
                        padding: "3px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: core.theme('colors.white'),
                        textShadow: "0px 0px 1px #000",
                    },
                    action: {
                        borderRadius: 3,
                        padding: "3px 7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: 'pointer',
                    },
                    mediaWrap: {
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                        position: "relative",
                        paddingBottom: 45,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                    audioWrap: {
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        width: '500px',
                    },
                    picture: {
                        maxHeight: "100%",
                        left: "50%",
                        top: "50%",
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        paddingBottom: 15,
                    },
                    thumbnailsRow: {
                        display: "flex",
                        alignItems: "center",
                        height: SELECTOR_HEIGHT,
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    dotsRow: {
                        display: "flex",
                        alignItems: "center",
                        height: SELECTOR_HEIGHT,
                        width: '100%',
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    buttonStyle: {
                        height: 80,
                        width: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    iconStyle: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 75,
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                    prevArrow: {
                        display: (noArrows) ? 'none' : "flex",
                        alignItems: "center",
                        position: 'absolute',
                        left: 0,
                        zIndex: 1,
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                    },
                    nextArrow: {
                        display: (noArrows) ? 'none' : "flex",
                        alignItems: "center",
                        position: 'absolute',
                        right: 0,
                        zIndex: 1,
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                    },
                    renderDownloadButton: {
                        pointer: (downloading) ? 'wait' : 'pointer',
                        height: 30,
                        width: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    downloadWaiting: { 
                        color: core.theme('colors.white'),
                        cursor: 'wait',
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                    downloadIcon: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 24,
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                }
                return(styles[s]);
            },

            setStateFromProps(props) {
                let {selectedId, gallery} = props;
                let defaultGallery = this.defaultGallery();
                let newId = (selectedId) ? selectedId
                            : (gallery) ? gallery[0].id
                              : defaultGallery[0].id;
                let newGallery = (gallery) ? gallery : defaultGallery;

                this.setState({selectedId: newId, gallery: newGallery});
            },
            
            defaultGallery() {
                return require('./defaultGallery.js');
            },

            keyboardKeyHandle(event) {

                switch (event.keyCode) {
                    case 27: // Esc
                        core.emit('Lightbox.close');
                        break;
                    case 37: // Left Arrow
                        this.gotoPrevImage();
                        break;
                    case 39: // Right Arrow
                        this.gotoNextImage();
                        break;
                
                    default:
                        // console.log( 'event.keyCode --> ', event.keyCode );
                        break;
                }

            },

            gotoPrevImage() {
                let {selectedId, gallery} = this.state;
                let max = gallery.length - 1;
                let selected_idx = this.getMediaIndex(gallery, selectedId);
                let idx = (selected_idx === 0) ? max : selected_idx - 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            gotoNextImage() {
                let {selectedId, gallery} = this.state;
                let max = gallery.length - 1;
                let selected_idx = this.getMediaIndex(gallery, selectedId);
                let idx = (selected_idx === max) ? 0 : selected_idx + 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            getMediaIndex( gallery, givenID ) {
                let imageIndex = -1;

                for (let i = 0; i < gallery.length; i++) {
                    const image = gallery[i];
                    if (image.id === givenID) imageIndex = i;
                }

                return imageIndex;
            },

            getImageDownloadName(media, selected_idx) {

                let urlSplit = media.url.split('.');
                let imgExtention = media.mimetype ? media.mimetype : urlSplit[urlSplit.length - 1];
                let type = '';

                if ( !media.type ) type = 'image';
                else {
                    switch (media.type) {
                        case 'video' :
                            type = 'video';
                            break;
                        case '' :
                        case 'image' :
                        default:
                            type = 'image';
                            break;
                    }
                }

                let mediaName = media.name;

                if ( !mediaName || _.isEmpty(mediaName) ) { mediaName = core.translate('Gallery'); }

                return `${mediaName}-${core.translate(type)}-${selected_idx+1}.${imgExtention}`;
            },

            mediaErrorHandler(elementID, type='image') {
                if (document.getElementById(`${elementID}`))
                    document.getElementById(`${elementID}`)
                            .setAttribute('src', `/resources/images/placeholder-${type}.png`);
            },

            renderMedia() {
                let {gallery, selectedId} = this.state;

                let selected_idx = this.getMediaIndex(gallery, selectedId);

                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;

                let media = gallery[selected_idx];
                let mediaURL = media.url;
                let mediaId = media.id;
                let mediaType = (media.type) ? media.type : 'image';
                let elementID = `Gallery.Image.id_${mediaId}`;

                let mediaRender = <img id={ elementID} src={ mediaURL } style={ this.styles('picture') } onError={ ()=>{ this.mediaErrorHandler(elementID, mediaType) } }/>;

                if ( media.type && media.mimeType && media.type === 'video' ) {
                    mediaRender = <video 
                                    controls 
                                    height={800} 
                                    style={ {maxHeight: '100%'} } 
                                    src={ mediaURL } 
                                    type={ `video/${media.mimeType}` } 
                                    onError={ ()=>{ this.mediaErrorHandler(elementID, mediaType) } }
                                  />;
                } else if ( media.type && media.mimeType && media.type === 'audio' ) {
                    mediaRender = <div id={'Gallery.audioWrap'} style={ this.styles('audioWrap') }>
                                    <audio 
                                        controls 
                                        style={{width: '100%'}}
                                        src={ mediaURL } 
                                        type={ `video/${media.mimeType}` } 
                                        onError={ ()=>{ this.mediaErrorHandler(elementID, mediaType) } }
                                    />
                                  </div>;
                };

                return(
                    <div id={'Gallery.renderMedia'} style={ this.styles('mediaWrap') }>
                        { mediaRender }
                    </div>
                );
            },

            updateSelected(selectedId) {
                this.setState({selectedId});
            },
            
            buildThumbnailsGallery() {
                let {gallery,} = this.state;
                let thumbList = [];
                for (let i = 0; i < gallery.length; i++) {
                    const media = gallery[i];
                    thumbList.push({
                        id: media.id,
                        url: (media.thumbnail) ? media.thumbnail : media.url,
                        type: (media.type) ? media.type : 'image',
                    });
                }

                return thumbList;
            },
            
            buildDotsGallery() {
                let {gallery,} = this.state;
                let dotsList = [];
                for (let i = 0; i < gallery.length; i++) {
                    const media = gallery[i];
                    dotsList.push({
                        id: media.id,
                    });
                }

                return dotsList;
            },

            renderSelector() {
                let {selectedId, selector} = this.state;
                
                switch (selector) {
                    case 'dots':
                        return (
                            <div id={'Gallery.selectorRow'} style={ this.styles('dotsRow') } >
                                <GalleryDots 
                                    selectedId={ selectedId }
                                    dotsGallery={ this.buildDotsGallery() }
                                    updateSelected={ this.updateSelected }
                                />
                            </div>
                        );
                    case 'thumbnails':
                        return (
                            <div id={'Gallery.selectorRow'} style={ this.styles('thumbnailsRow') } >
                                <Thumbnails 
                                    selectedId={ selectedId }
                                    thumbnailsGallery={ this.buildThumbnailsGallery() }
                                    updateSelected={ this.updateSelected }
                                />
                            </div>
                        );
                    default:
                        return null;
                }
                
            },

            renderPrevPicture() {
                let title = core.translate('Previous picture');

                return (
                    <div id={'Gallery.prev'} style={ this.styles('prevArrow')}>
                        <IconButton id={'Gallery.buttonPrev'} style={ this.styles('buttonStyle')} onClick={ this.gotoPrevImage }>
                            <Icon key={ 'navigatePreviousPicture' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('navigatePrevious') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderNextPicture() {
                let title = core.translate('Next picture');

                return (
                    <div id={'Gallery.next'} style={ this.styles('nextArrow')}>
                        <IconButton id={'Gallery.buttonNext'} style={ this.styles('buttonStyle')} onClick={ this.gotoNextImage }>
                            <Icon key={ 'navigateNextPicture' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('navigateNext') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderDownload() {
                let {gallery, selectedId, downloading, showDownload} = this.state;

                let title = core.translate('Download this image');

                let selected_idx = this.getMediaIndex(gallery, selectedId);
                if( !showDownload || !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;
                
                let image = gallery[selected_idx];
                let imageURL = image.url;

                const download = () => {
                    const error = () => {
                        core.emit('notify', {
                            title: core.translate('Download Fail'),
                            text: core.translate('Unable to download the current image'),
                            alertKind: 'error'
                        });
                        this.setState({downloading: false});
                    }
                    this.setState({downloading: true}, ()=>{
                        let xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = () => {
                            if (xhr.status === 404) { return error(); } 
                            let alink = document.createElement('a');
                                alink.href = window.URL.createObjectURL(xhr.response);
                                alink.download = this.getImageDownloadName(image, selected_idx);
                                alink.style.display = 'none';
                                alink.onError = error;
                            document.body.appendChild(alink);
                                alink.click();
                            document.body.removeChild(alink);
                        };
                        xhr.open('GET', imageURL);
                        xhr.onError = error;
                        xhr.onreadystatechange = ()=>{ if (xhr.readyState === 4) { this.setState({downloading: false}); } }
                        xhr.send();
                    });
                };

                let downloadIcon = (downloading) ? 
                                    <CircularProgress style={ this.styles('downloadWaiting') } size={20} thickness={2.0} variant={'indeterminate'}/> :
                                    <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('download') }</Icon>;

                return (
                    <div id={'Gallery.download'} style={ this.styles('action') } >
                        <IconButton
                            disabled={downloading}
                            disableRipple={downloading}
                            key={ 'ImageDownload' }
                            style={this.styles('renderDownloadButton')}
                            onClick={ download }
                        >
                            { downloadIcon }
                        </IconButton>
                    </div>
                );
            },

            renderInfo() {
                let {showInfo} = this.state;

                if (!showInfo) return null;

                let title = core.translate('About this image');

                const about = () => {
                    console.log( 'about me ');
                };

                return (
                    <div id={'Gallery.info'} style={ this.styles('action') } >
                        <IconButton  key={ 'ImageDownload' } style={this.styles('renderDownloadButton')} onClick={ about } >
                            <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('info') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderCounter() {
                let {gallery, selectedId, showCounter} = this.state;

                if ( !showCounter || !gallery || !gallery.length) return null;

                let gallerySize = gallery.length;
                let selected_idx = this.getMediaIndex(gallery, selectedId);

                return(
                    <div id={'Gallery.counter'} style={ this.styles('counter') } >
                        { `${selected_idx+1} / ${gallerySize}` }
                    </div>
                );
            },

            renderActionButtons() {
                let {showCounter, showDownload, showInfo} = this.state;

                if (!showCounter && !showDownload && !showInfo ) return null;

                return(
                    <div id={'Gallery.actionButtons'} style={ this.styles('actionButtons')}>
                        { this.renderCounter() }
                        { this.renderDownload() }
                        { this.renderInfo() }
                    </div>
                )
            },

            render() {

                let {gallery} = this.state;
                if(!gallery || _.isEmpty(gallery)) return null;

                return (
                    <div id={'Gallery.root'} style={ this.styles('root') }>
                        { this.renderActionButtons() }
                        { this.renderPrevPicture() }
                        { this.renderNextPicture() }
                        { this.renderMedia() }
                        { this.renderSelector() }
                    </div>
                )
            }
        }
    }
};