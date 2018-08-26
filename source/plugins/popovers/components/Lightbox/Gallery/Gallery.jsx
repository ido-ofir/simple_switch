import { Icon, IconButton } from '@material-ui/core/';


module.exports = {
    name: "Gallery",
    description: '',
    dependencies: ['popovers.Lightbox', 'popovers.LightboxTitleBar', 'profiler.ActionButton', 'profiler.helper'],

    get(Lightbox, LightboxTitleBar, ActionButton, Helper) {
        var core = this;
        var { React, PropTypes } = core.imports;

        const THUMBNAIL_LIST_SIZE = 13;

        return {

            getInitialState() {
                return {
                    selectedId: 0,
                    gallery: [],
                    galleryName: '',
                    galleryOpen: false,
                    allowSetAsProfile: true,
                    id_forSetAsProfile: 0,
                };
            },

            componentDidMount() {
                document.addEventListener("keydown", this.handleKeyPress);
                core.on('Gallery.open', this.lightboxOpen);
                core.on('Gallery.close', this.lightboxClose);
            },
            
            componentWillUnmount() {
                document.removeEventListener("keydown", this.handleKeyPress);
                core.off('Gallery.open', this.lightboxOpen);
                core.off('Gallery.close', this.lightboxClose);
            },

            styles(s) {

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
                    counter: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: core.theme('backgrounds.black04'),
                        borderRadius: 3,
                        padding: "3px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    pictureWrap: {
                        height: `calc(100% - 180px)`,
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
                        justifyContent: "center",
                        height: 150,
                        maxWidth: "calc(100% - 15px)",
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        backgroundColor: core.theme('transparent.black_80'),
                        borderRadius: 2,
                    },
                    thumbnail: {
                        marginRight: 5,
                        borderRadius: 4,
                        position: "relative",
                        height: 120,
                        width: 120,
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
                        display: "flex",
                        alignItems: "center",
                        position: 'absolute',
                        left: 0,
                        zIndex: 1,
                        height: 'calc(100% - 180px)',
                    },
                    nextArrow: {
                        display: "flex",
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

            lightboxOpen(data) {

                let allowSetAsProfile = (data.allowSetAsProfile === undefined) ? true : data.allowSetAsProfile;

                this.setState({
                    selectedId:    data.selectedId,
                    gallery:       data.gallery,
                    galleryName:   data.galleryName,
                    galleryOpen:   true,
                    id_forSetAsProfile: data.id_forSetAsProfile,
                    allowSetAsProfile,
                }, ()=>{ core.emit('Lightbox.open') });
            },
            
            lightboxClose() {
                core.emit('Lightbox.close');
                this.setState({
                    galleryOpen: false,
                    allowSetAsProfile: true,
                });
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

            handleKeyPress(event) {

                let {galleryOpen} = this.state;

                if (!galleryOpen) return;

                switch (event.keyCode) {
                    case 27: // Esc
                        this.lightboxClose();
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

            getImageDownloadName(imageURL, selected_idx) {
                let {names} = this.state;

                let urlSplit = imageURL.split('.');
                let imgExtention = urlSplit[urlSplit.length - 1];
                if (imgExtention.length > 3) imgExtention = 'jpg';

                let name = '';
                if ( names && !_.isEmpty(names) ) {
                    if ( names instanceof Array ) { if ( names[0].value ) { name = names[0].value.first || names[0].value.display || core.translate('Gallery'); } } 
                    else if ( typeof(names) === 'string' ) { name = names; } 
                    else { name = names.first || names.last || names.complete || core.translate('Gallery'); }
                } else { name = core.translate('Gallery'); }

                return `${name}-${core.translate('Image')}-${selected_idx+1}.${imgExtention}`;
            },

            makeProfilePicture(){
                let { selectedId } = this.state;
                let { selectedItem, tabs } = core.tree.get(['plugins', 'profiler']);

                const handleSuccess = (profile) => {
                    if (profile) {
                        core.emit('refresh:profile', { person: profile });
                        this.setState({ id_forSetAsProfile: selectedId })
                    }
                }

                let data = {
                    search_id: selectedItem.id, 
                    person_id: tabs.profileActiveTabId, 
                    image_id: selectedId
                }
                core.plugins.profiler.run('profile.picture', data).then(handleSuccess);

                
            },
            
            imageErrorHandler(elementID) {
                document.getElementById(`${elementID}`)
                        .setAttribute('src', '/resources/images/placeholder-image.png');
            },

            slidingThumbs(gallery) {
                let {selectedId} = this.state;

                const SIDE_SIZE = Math.floor(THUMBNAIL_LIST_SIZE/2);

                let selected_idx = this.getImageIndex(gallery, selectedId);

                let thumbArray = [];
                    thumbArray.push(gallery[selected_idx])
                
                for (let i = selected_idx -1, j = 0; j < SIDE_SIZE; j++, i--) {
                    if (i < 0) i = gallery.length - 1;
                    thumbArray.unshift(gallery[i]);
                }

                for (let i = selected_idx + 1, j = 0; j < SIDE_SIZE; j++, i++) {
                    if (i === gallery.length ) i = 0;
                    thumbArray.push(gallery[i]);
                }

                return thumbArray;
            },

            renderDownloadButton() {
                let {gallery, selectedId} = this.state;
                let title = core.translate('Download this image');

                let selected_idx = this.getImageIndex(gallery, selectedId);
                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].value ) return null;
                
                let imageURL = gallery[selected_idx].value.url;

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
                            alink.download = this.getImageDownloadName(imageURL, selected_idx);
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
                    <IconButton  key={ 'ImageDownload' } style={{ ...this.styles('renderDownloadButton'), marginRight: 15 }} onClick={ download } >
                        <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('download') }</Icon>
                    </IconButton>
                );
            },

            renderMakeProfileImage(){
                let { selectedId , id_forSetAsProfile, allowSetAsProfile } = this.state;

                if (!allowSetAsProfile) return null;

                let title = core.translate('Save as profile picture');

                return (
                    <IconButton  key={ 'ImageProfile' }  style={ this.styles('renderDownloadButton')} onClick={ this.makeProfilePicture } >
                        <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons( selectedId == id_forSetAsProfile ? 'star_full' : 'star_empty') }</Icon>
                    </IconButton>
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

                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].value ) return null;

                let image = gallery[selected_idx];
                let imageURL = image.value.url;
                let imgId = image.id;
                let elementID = `Gallery.Image.id_${imgId}`;

                return(
                    <div id={'Gallery.renderPicture'} style={ this.styles('pictureWrap') }>
                        <img 
                            id={ elementID}
                            src={ imageURL } 
                            onError={ ()=>{ this.imageErrorHandler(elementID) } }
                            style={ this.styles('picture') }
                        />
                    </div>
                );
            },

            renderThumbnailMap(image, key) {
                let {selectedId} = this.state;
                let imageURL = image.value.url;
                
                let imageID = image.id;
                
                const thumbClick = () => {
                    this.setState({selectedId: imageID});
                };

                let thumbnailWrapStyle = this.styles('thumbnail');
                    thumbnailWrapStyle.border = (imageID === selectedId) ? `2px solid ${core.theme('colors.primary')}` : `2px solid transparent`;
                let elementID = `ThumbnailImage.id_${key}`;

                return(
                    <div id={`Thumbnail.id_${key}`} key={key} style={ thumbnailWrapStyle } onClick={ thumbClick } >
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
                if( !gallery || _.isEmpty(gallery) ) return null; // noresult

                let thumbGallery = gallery.length > THUMBNAIL_LIST_SIZE ? this.slidingThumbs(gallery) : gallery;

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
                        <IconButton style={ this.styles('buttonStyle')} onClick={ this.gotoPrevImage }>
                            <Icon key={ 'navigatePreviousPicture' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('navigatePrevious') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderNextPicture() {
                let title = core.translate('Next picture');

                return (
                    <div id={'Gallery.next'} style={ this.styles('nextArrow')}>
                        <IconButton style={ this.styles('buttonStyle')} onClick={ this.gotoNextImage }>
                            <Icon key={ 'navigateNextPicture' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('navigateNext') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            lightboxTitle() {
                let {galleryName} = this.state;

                let title = galleryName ? `${galleryName} - ${core.translate('Gallery')}` : core.translate('Gallery');
                let buttons = [this.renderDownloadButton(), this.renderMakeProfileImage() ];

                return (
                    <LightboxTitleBar title={ title } buttons={ buttons }/>
                );
            },

            render() {
                let {gallery} = this.state;
                if(!gallery || _.isEmpty(gallery)) return null;

                return (
                    <Lightbox title={ this.lightboxTitle() } >
                        <div id={'Gallery.root'} style={ this.styles('root') }>
                            { this.renderCounter() }
                            { this.renderPrevPicture() }
                            { this.renderNextPicture() }
                            { this.renderPicture() }
                            { this.renderThumbs() }
                        </div>
                    </Lightbox>
                )
            }
        }
    }
};