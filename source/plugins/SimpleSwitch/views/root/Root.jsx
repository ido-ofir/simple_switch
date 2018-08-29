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
        'SimpleSwitch.Loader',
        'Settings.Settings',
        'router.Router',
    ],
    get(AppBar,Nav, Notify, Popup, Caution, Lightbox, Login, Loader, Settings, Router) {

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
                core.plugins.Settings.getInitialFiles(()=>{
                    this.getLanguage();
                });

                this.getDataExample();
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

            getLanguage(){
                core.plugins.SimpleSwitch.run('getLanguage').then(()=>{
                      
                    this.setState({start:true});

                  }).catch( ()=>{
                    this.setState({start:true});
                });
            },

            getDataExample(){
                core.plugins.SimpleSwitch.run('getDataEx').then((modifyData)=>{
                   console.log('modifyData--> ',modifyData);
                  }).catch( ()=>{
                   console.log('2--> ',2);                    
                });
            },

            handleNav(route){
              core.plugins.router.to('/'+route);
              this.setState({ activeView: route })

            },

            handleLoggedIn(){
              core.plugins.router.to('/home');
              this.setState({ activeView: 'home' })
            },

            onNavigation(route){
                this.setState({activeView:route.name});
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
