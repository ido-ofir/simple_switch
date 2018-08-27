module.exports = {
    name: "helper",
    dependencies: [],

    get() {


        return {

            safeState(context,state, callback){
                if(context.isUnmounted) return;
                context.setState(state, callback);
            },
            
            CopyTopClipboard(textToCopy){

                const handleError = (err) => {

                    let notify = {
                        title: 'Could not copy text',
                        text: err,
                        alertKind: 'error'
                    }

                    core.emit('notify',notify);
                };
                if (!textToCopy) return handleError('missing text to copy...')
                const handleSuccess = () => {
                    var text = core.translate('Copied to clipboard successfully!');

                    let notify = {
                        title: textToCopy,
                        text: text,
                        alertKind: 'info'
                    }

                    core.emit('notify',notify);
                };

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then( handleSuccess, handleError );
                } else {
                  const el = document.createElement('textarea');
                  el.value = textToCopy;
                  el.style.display = 'none';
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  handleSuccess()
                }

            },
            capitalizeFirstLetter(string) {
                if(!string) return '';
                else if(!isNaN(string) ) return string;
                else return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            },

            mapObject(obj){
              if (obj && !_.isEmpty(obj)) {
                  return _.map(Object.keys(obj), key => {
                      return {
                          key: key,
                          data: typeof obj[key] === 'object' ? this.mapObject(obj[key]) : obj[key],
                          title: this.openCamelCase(key)
                      }
                  });
              }
            },

            openCamelCase(str) {
                if (!str) return '';
                if (typeof(str) === 'string' && !!str.length) {
                    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/\b[a-z](?=[a-z]{2})/g,
                        function(letter) {
                          return letter.toUpperCase();
                        }
                    );
                }
                return str;
            },

            makeCamelCase(str) {
                if (!str) return '';
                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,
                    function(match, index) {
                        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                        return index == 0 ? match.toLowerCase() : match.toUpperCase();
                    }
                );
            },

            cutString(str, num){
                if(str.length > num) return(str.substring(0,num-3)+'...');
                return str;
            },

            scrollTopAnimation(element, speed=5) {

                let currentScrollTop = element.scrollTop;
                let initScrollTop = currentScrollTop;

                var intervalId = setInterval(() => {

                currentScrollTop = currentScrollTop - initScrollTop*0.01*speed;
                element.scrollTop = currentScrollTop ;

                  if(currentScrollTop == 0){
                    clearInterval(intervalId);
                  }
                }, 20);

                setTimeout(() => {
                    clearInterval(intervalId);
                }, 3000);

            },

            setLoaderForTabsPage(bool){
                let initLoading = core.plugins.SimpleSwitch.get(['initLoading']);

                if(initLoading !== bool){
                    core.plugins.SimpleSwitch.set(['initLoading'], bool);
                }
            },

            setLoaderForTabsCheck(){
                let sections = core.plugins.SimpleSwitch.get(['checkForTabsLoader']);
                sections++;

                if(sections === 3){
                    core.plugins.SimpleSwitch.set(['initLoading'], false);
                } else {
                    core.plugins.SimpleSwitch.set(['checkForTabsLoader'],sections);
                }

            },

            handleActionError (error, promise, title) {
                let err = '';

                if(error.status === 401){
                    core.plugins.SimpleSwitch.set(['isLoggedIn'], false);
                }

                if (!title) title = core.translate(`Can't get results`);

                if(_.isEmpty(error.data))  err = core.translate(error.statusText);
                else if(error.data.message) err = core.translate(error.data.message);
                else if(error.data.errors instanceof Array) err = core.translate(error.data.errors[0]);
                else if(error.data.errors && error.data.errors.status) err = core.translate(error.data.errors.status[0]);
                else if(error.data.errors) err = core.translate(error.data.errors);
                else err = core.translate(error.data);

                if(error.status === 500){
                    err = core.translate(error.statusText);
                }

                let notify = {
                    title: title,
                    text: err,
                    alertKind: 'error'
                }

                core.emit('notify',notify);
                promise.reject({error: error, message: err});
            },

            modifySocialNames(socialNetwork) {
              if(!socialNetwork) return null;

              let social = socialNetwork.toLowerCase().trim();
              switch ( social ) {
                case 'fb'               : return 'facebook';
                case 'google profiles'  : return 'google+';
                case 'instagram.com'    : return 'instagram';
                case 'email directory'  : return 'email';
              }

              return social;
            },

        };
    }
}
