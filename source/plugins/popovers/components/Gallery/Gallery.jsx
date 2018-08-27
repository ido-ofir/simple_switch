import { Icon, IconButton } from '@material-ui/core/';

module.exports = {
    name: "Gallery",
    description: '',
    dependencies: ['SimpleSwitch.helper'],

    get(Helper) {
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
                };
            },

            componentWillMount() {
                this.setStateFromProps(this.props);
            },

            componentDidMount() {
                document.addEventListener("keydown", this.keyboardKeyHandle);
                document.addEventListener("onkeydown", this.keyboardKeyHandle);
            },
            
            componentWillUnmount() {
                document.removeEventListener("keydown", this.keyboardKeyHandle);
                document.removeEventListener("onkeydown", this.keyboardKeyHandle);
            },

            styles(s) {
                let {gallery} = this.state;
                let noThumbnails = gallery.length === 1;

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
                        backgroundColor: core.theme('backgrounds.black04'),
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
                    },
                    action: {
                        borderRadius: 3,
                        padding: "3px 7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: 'pointer',
                    },
                    pictureWrap: {
                        height: (noThumbnails) ? '100%' : `calc(100% - 180px)`,
                        position: "relative",
                        paddingBottom: 15,
                        marginLeft: 'auto',
                        marginRight: 'auto',
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
                        height: 150,
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        backgroundColor: core.theme('transparent.black_80'),
                        borderRadius: 2,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    thumbnail: {
                        marginRight: 15,
                        borderRadius: 4,
                        position: "relative",
                        height: 100,
                        width: 130,
                        minWidth: 130,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: core.theme('transparent.white_85'),
                    },
                    thumbnailImage: {
                        cursor: 'pointer',
                        maxHeight: "100%",
                        maxWidth: "100%",
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
                    },
                    prevArrow: {
                        display: (noThumbnails) ? 'none' : "flex",
                        alignItems: "center",
                        position: 'absolute',
                        left: 0,
                        zIndex: 1,
                        height: 'calc(100% - 180px)',
                    },
                    nextArrow: {
                        display: (noThumbnails) ? 'none' : "flex",
                        alignItems: "center",
                        position: 'absolute',
                        right: 0,
                        zIndex: 1,
                        height: 'calc(100% - 180px)',
                    },
                    renderDownloadButton: {
                        height: 30,
                        width: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    downloadIcon: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 24,
                    },
                    sourceWrap: {
                        right: 0,
                        bottom: 0,
                        position: "absolute",
                    },
                    sourceIcon: {
                        position: "absolute",
                        right: 3,
                        bottom: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        zIndex: 2, 
                        color: core.theme('colors.white')
                    }
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

                let defaultPath = '/resources/images/default_gallery';
                return [
                    { 
                        id: '19487501bat_metal', 
                        name: 'bat_metal', 
                        url: `${defaultPath}/bat_metal.jpg`,
                        info: { 
                            title: 'bat_metal', 
                            body: 'This is a example for bat_metal info body text.' 
                        } 
                    }, { 
                        id: '19487502beach_party2', 
                        name: 'beach_party 2', 
                        url: `${defaultPath}/beach_party 2.jpg`,
                        info: { 
                            title: 'beach_party 2', 
                            body: 'This is a example for beach_party 2 info body text.' 
                        } 
                    }, { 
                        id: '19487503beach_party', 
                        name: 'beach_party', 
                        url: `${defaultPath}/beach_party.jpg`,
                        info: { 
                            title: 'beach_party', 
                            body: 'This is a example for beach_party info body text.' 
                        } 
                    }, { 
                        id: '19487504ff_x20_008', 
                        name: 'ff_x20_008', 
                        url: `${defaultPath}/ff_x20_008.JPG`,
                        info: { 
                            title: 'ff_x20_008', 
                            body: 'This is a example for ff_x20_008 info body text.' 
                        } 
                    }, { 
                        id: '19487505happy-people', 
                        name: 'happy-people', 
                        url: `${defaultPath}/happy-people.png`,
                        info: { 
                            title: 'happy-people', 
                            body: 'This is a example for happy-people info body text.' 
                        } 
                    }, { 
                        id: '19487506happy-people-wallpaper-mobile', 
                        name: 'happy-people-wallpaper-mobile', 
                        url: `${defaultPath}/happy-people-wallpaper-mobile.jpg`,
                        info: { 
                            title: 'happy-people-wallpaper-mobile', 
                            body: 'This is a example for happy-people-wallpaper-mobile info body text.' 
                        } 
                    }, { 
                        id: '19487507images', 
                        name: 'images', 
                        url: `${defaultPath}/images.jpg`,
                        info: { 
                            title: 'images', 
                            body: 'This is a example for images info body text.' 
                        } 
                    }, { 
                        id: '19487508IMG_20170616_214324', 
                        name: 'IMG_20170616_214324', 
                        url: `${defaultPath}/IMG_20170616_214324.jpeg`,
                        info: { 
                            title: 'IMG_20170616_214324', 
                            body: 'This is a example for IMG_20170616_214324 info body text.' 
                        } 
                    }, { 
                        id: '19487509lamp', 
                        name: 'lamp', 
                        url: `${defaultPath}/lamp.jpg`,
                        info: { 
                            title: 'lamp', 
                            body: 'This is a example for lamp info body text.' 
                        } 
                    }, { 
                        id: '19487510milla_jovovich', 
                        name: 'milla_jovovich', 
                        url: `${defaultPath}/milla_jovovich.jpg`,
                        info: { 
                            title: 'milla_jovovich', 
                            body: 'This is a example for milla_jovovich info body text.' 
                        } 
                    }, { 
                        id: '19487511papers.co-ni17-red-rose-flower-spring-happy-33-iphone6-wallpaper', 
                        name: 'papers.co-ni17-red-rose-flower-spring-happy-33-iphone6-wallpaper', 
                        url: `${defaultPath}/papers.co-ni17-red-rose-flower-spring-happy-33-iphone6-wallpaper.jpg`,
                        info: { 
                            title: 'papers.co-ni17-red-rose-flower-spring-happy-33-iphone6-wallpaper', 
                            body: 'This is a example for papers.co-ni17-red-rose-flower-spring-happy-33-iphone6-wallpaper info body text.' 
                        } 
                    }, { 
                        id: '19487512sun_set', 
                        name: 'sun_set', 
                        url: `${defaultPath}/sun_set.jpg`,
                        info: { 
                            title: 'sun_set', 
                            body: 'This is a example for sun_set info body text.' 
                        } 
                    }, { 
                        id: '19487513teen_titans', 
                        name: 'teen_titans', 
                        url: `${defaultPath}/teen_titans.jpg`,
                        info: { 
                            title: 'teen_titans', 
                            body: 'This is a example for teen_titans info body text.' 
                        } 
                    }, { 
                        id: '19487514the_trooper', 
                        name: 'the_trooper', 
                        url: `${defaultPath}/the_trooper.jpg`,
                        info: { 
                            title: 'the_trooper', 
                            body: 'This is a example for the_trooper info body text.' 
                        } 
                    }, { 
                        id: '19487515wallpaper.wiki-Free-Desktop-Happy-Pictures-HD-PIC-WPE008150', 
                        name: 'wallpaper.wiki-Free-Desktop-Happy-Pictures-HD-PIC-WPE008150', 
                        url: `${defaultPath}/wallpaper.wiki-Free-Desktop-Happy-Pictures-HD-PIC-WPE008150.jpg`,
                        info: { 
                            title: 'wallpaper.wiki-Free-Desktop-Happy-Pictures-HD-PIC-WPE008150', 
                            body: 'This is a example for wallpaper.wiki-Free-Desktop-Happy-Pictures-HD-PIC-WPE008150 info body text.' 
                        } 
                    }, { 
                        id: '19487516Wallpapers-flower-pink-love-garden-nature', 
                        name: 'Wallpapers-flower-pink-love-garden-nature', 
                        url: `${defaultPath}/Wallpapers-flower-pink-love-garden-nature.jpg`,
                        info: { 
                            title: 'Wallpapers-flower-pink-love-garden-nature', 
                            body: 'This is a example for Wallpapers-flower-pink-love-garden-nature info body text.' 
                        } 
                    }, { 
                        id: '19487517x100s-moore-farms-passion-flower-0107-2013', 
                        name: 'x100s-moore-farms-passion-flower-0107-2013', 
                        url: `${defaultPath}/x100s-moore-farms-passion-flower-0107-2013.jpg`,
                        info: { 
                            title: 'x100s-moore-farms-passion-flower-0107-2013', 
                            body: 'This is a example for x100s-moore-farms-passion-flower-0107-2013 info body text.' 
                        } 
                    }, { 
                        id: '19487518xenia', 
                        name: 'xenia', 
                        url: `${defaultPath}/xenia.jpg`,
                        info: { 
                            title: 'xenia', 
                            body: 'This is a example for xenia info body text.' 
                        } 
                    }, 
                ]
            },

            getSourceIcon(image, size = 'big') {
                let socialNetwork = (image && !_.isEmpty(image) && image.sources && !_.isEmpty(image.sources)) ? image.sources[0].name.toLowerCase() : false;
                    socialNetwork = Helper.modifySocialNames(socialNetwork);

                let icon = socialNetwork ? core.icons(socialNetwork) : false;
                if (!icon) return null;

                let iFont, iBorder, iMargin;
                if (size === 'thumb') {
                    iFont = 10;
                    iBorder = 30;
                    iMargin = 0;
                }
                else {
                    iFont = 26;
                    iBorder = 60;
                    iMargin = 2;
                }

                let iconStyle = {...this.styles('sourceIcon'), fontSize: iFont, margin: iMargin, };
                
                let wrapStyle = {...this.styles('sourceWrap'),
                    borderBottom: `${iBorder}px solid ${core.theme('socialNetwork.'+socialNetwork)}`,
                    borderLeft: `${iBorder}px solid transparent`,
                };

                return (
                    <div>
                        <div id={ 'socialIcon.wrap' } style={ wrapStyle }/>
                        <Icon style={ iconStyle } className={icon} />
                    </div>
               );
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
                let selected_idx = this.getImageIndex(gallery, selectedId);
                let idx = (selected_idx === 0) ? max : selected_idx - 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            gotoNextImage() {
                let {selectedId, gallery} = this.state;
                let max = gallery.length - 1;
                let selected_idx = this.getImageIndex(gallery, selectedId);
                let idx = (selected_idx === max) ? 0 : selected_idx + 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            getImageIndex( gallery, givenID ) {
                let imageIndex = -1;

                for (let i = 0; i < gallery.length; i++) {
                    const image = gallery[i];
                    if (image.id === givenID) imageIndex = i;
                }

                return imageIndex;
            },

            getImageDownloadName(image, selected_idx) {

                let urlSplit = image.url.split('.');
                let imgExtention = urlSplit[urlSplit.length - 1];
                if (imgExtention.length > 3) imgExtention = 'jpg';

                let imageName = image.name;

                if ( !imageName || _.isEmpty(imageName) ) { imageName = core.translate('Gallery'); }

                return `${imageName}-${core.translate('Image')}-${selected_idx+1}.${imgExtention}`;
            },

            imageErrorHandler(elementID) {
                document.getElementById(`${elementID}`)
                        .setAttribute('src', '/resources/images/placeholder-image.png');
            },

            renderDownload() {
                let {gallery, selectedId} = this.state;
                let title = core.translate('Download this image');

                let selected_idx = this.getImageIndex(gallery, selectedId);
                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;
                
                let image = gallery[selected_idx];
                let imageURL = image.url;

                const download = () => {
                    const error = () => {
                        core.emit('notify', {
                            title: core.translate('Download Fail'),
                            text: core.translate('Unable to download the current image'),
                            alertKind: 'error'
                        });
                    }
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
                    xhr.send();
                };

                return (
                    <div id={'Gallery.download'} style={ this.styles('action') } >
                        <IconButton  key={ 'ImageDownload' } style={this.styles('renderDownloadButton')} onClick={ download } >
                            <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('download') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderInfo() {
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
                let {gallery, selectedId} = this.state;

                if (!gallery || !gallery.length) return null;

                let gallerySize = gallery.length;
                let selected_idx = this.getImageIndex(gallery, selectedId);

                return(
                    <div id={'Gallery.counter'} style={ this.styles('counter') } >
                        { `${selected_idx+1} / ${gallerySize}` }
                    </div>
                );
            },

            renderPicture() {
                let {gallery, selectedId} = this.state;

                let selected_idx = this.getImageIndex(gallery, selectedId);

                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;

                let image = gallery[selected_idx];
                let imageURL = image.url;
                let imgId = image.id;
                let elementID = `Gallery.Image.id_${imgId}`;

                return(
                    <div id={'Gallery.renderPicture'} style={ this.styles('pictureWrap') }>
                        <img id={ elementID}
                             src={ imageURL }
                             onError={ ()=>{ this.imageErrorHandler(elementID) } }
                             style={ this.styles('picture') } 
                        />
                    </div>
                );
            },

            renderThumbnailMap(image, key) {
                let {selectedId} = this.state;
                let imageURL = image.url;
                
                let imageID = image.id;
                
                const thumbClick = () => {
                    this.setState({selectedId: imageID});
                };

                let thumbnailWrapStyle = this.styles('thumbnail');
                    thumbnailWrapStyle.border = (imageID === selectedId) 
                                                ? `3px solid ${core.theme('colors.primary')}` 
                                                : `3px solid transparent`;
                let elementID = `ThumbnailImage.id_${key}`;

                if ( imageID === selectedId && document.getElementById(elementID) ) {
                    document.getElementById(elementID).scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                        inline: 'center'
                    });
                };

                return(
                    <div id={`Thumbnail.id_${key}`} key={key} style={ thumbnailWrapStyle } onClick={ thumbClick }>
                        <img id={ elementID }
                            src={ imageURL } 
                            onError={ ()=>{ this.imageErrorHandler(elementID) }}
                            style={ this.styles('thumbnailImage') }
                        />
                        { this.getSourceIcon(image, 'thumb') }
                    </div>
                );
            },

            renderThumbs() {
                let {gallery} = this.state;
                if( !gallery || _.isEmpty(gallery) || gallery.length === 1 ) { return null; }

                let thumbGallery = gallery;

                return(
                    <div id={'Gallery.ThumbnailsRow'} style={ this.styles('thumbnailsRow') } >
                        { thumbGallery.map( this.renderThumbnailMap )}
                    </div>
                );
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

            renderActionButtons() {
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
                        { this.renderPicture() }
                        { this.renderThumbs() }
                    </div>
                )
            }
        }
    }
};