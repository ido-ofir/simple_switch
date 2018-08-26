import { Paper, ClickAwayListener, MenuItem, Icon }  from '@material-ui/core';
var routes = require('./routes');

module.exports = {
    name: 'Root',
    description: '',
    bindings:{
        isLoggedIn: ['isLoggedIn'],
        currentUser :['currentUser'],
    },
    dependencies: [
        'SimpleSwitch.AppBar',
        'SimpleSwitch.Nav',
        'popovers.Notify',
        'popovers.Popup',
        'popovers.Caution',
        'popovers.Lightbox',
        'SimpleSwitch.Login',
        'SimpleSwitch.Loader'
    ],
    get(AppBar,Nav, Notify, Popup, Caution, Lightbox, Login, Loader) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            propsTypes: {
                path: PropTypes.array,
            },

            getInitialState() {
                return {
                    text: 'Root',
                    navIsOpen: false,
                    activeView: 'home',
                    start: false
                };
            },

            componentWillMount () {
                core.plugins.SimpleSwitch.run('getConfiguration').then((config)=>{
                  core.plugins.SimpleSwitch.set('config', JSON.stringify(config));
                  let parsed = JSON.parse(config);
                  document.title = config && parsed.appTitle || 'Loading..';
                })
                core.plugins.SimpleSwitch.run('getLanguage').then(()=>{
                    this.setState({start:true});
                }).catch( ()=>{
                    this.setState({start:true});
                });
            },

            componentDidMount() {
                core.on('notify',this.addNotification);
            },

            componentWillUnmount() {
                core.off('notify',this.addNotification);
            },

            componentDidCatch(err){
                this.setState({ error: err && err.toString() })
            },

            handleNav(route){
              core.plugins.router.to('/'+route);
              this.setState({ activeView: route })

            },

            searchFromNav(){  // not done! only tamplate
                let search = core.plugins.router.get('search');
                if(search){
                    core.plugins.router.remove('search');

                    let params = {
                        a: search,
                        loc: ''
                    }

                    core.plugins.SimpleSwitch.run('search', params).then( (result) => {


                    }).catch(()=>{


                    })

                }
            },

            handleLoggedIn(){
              core.plugins.router.to('/home');
              this.setState({ activeView: 'home' })
            },

            onNavigation(route){
                this.setState({activeView:route.name});

                // if(route.name === 'home'){
                //     let selectedItemId = core.plugins.router.get('selectedItemId');
                //     core.emit('selectItem',{id:selectedItemId});
                //    // this.searchFromNav();
                // } else {
                //     core.plugins.SimpleSwitch.set(['checkForTabsLoader'],0);
                // }
            },

            addNotification({title, text, alertKind}){
                core.plugins.popovers.addNotify(title, text, alertKind);
            },

            styles(s,place = {}) {
                let styles = {

                    root: {
                        width:'100%',
                        height:'100%',
                        overflow: 'hidden',
                    },

                    content: {
                        position: 'absolute',
                        top: 48,
                        left: 64,
                        bottom: 0,
                        right: 0,
                        overflow: 'hidden',
                        backgroundColor: core.theme('backgrounds.content'),
                    },


                    menuItem: {
                        fontSize: 13,
                        height: 30,
                        padding: '0px 15px',
                    }

                }
                return(styles[s]);
            },

            render() {
                let { navIsOpen, activeView, start } = this.state;
                let { isLoggedIn } = this.props;
                let { Router } = core.plugins.router;

                let authToken = localStorage.getItem('authToken');
                let currentUser = (localStorage.currentUser) ? JSON.parse(localStorage.getItem('currentUser')) : {};

                if(activeView == 'login' || !isLoggedIn) {
                    return(
                        <div style={ this.styles('root') }>
                            <Login onLoggedIn={ this.handleLoggedIn }/>
                            <Notify />
                            <Popup />
                        </div>
                    );
                }
                else return(
                    <div style={ this.styles('root') }>
                        <Lightbox />
                        <AppBar user={ currentUser } />
                        <Nav handleViews={this.handleNav} isOpen={ navIsOpen } activeView={activeView} />
                        <Notify />
                        <Popup />
                        <Caution />


                        <div style={ this.styles('content') }>
                           <Router routes={routes} defaultRoute={'/home'}  onNavigation={this.onNavigation}/>
                        </div>
                    </div>
                )
            }
        }
    }
};
