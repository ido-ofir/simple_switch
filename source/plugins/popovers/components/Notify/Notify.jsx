var NotificationSystem = require('react-notification-system');

module.exports = {
    name: "Notify",
    description: '',
    propTypes: {
        // name: 'string',
    },
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                position: PropTypes.string,
                autoDismiss: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    position: 'bl',
                    autoDismiss: 4
                };
            },

            getInitialState() {

                return {
                    error: null,
                };
            },

            componentDidMount() {
                core.on('addNotify',this.addNotification)
            },

            componentWillUnmount() {
                core.off('addNotify')
            },

            componentDidCatch(err){
                this.setState({ error: err && err.toString() })
            },

            addNotification({title, text, alertKind}){
                let {position, autoDismiss} = this.props;

                this.refs.notificationSystem.addNotification({
                  title: title,
                  position: position,
                  message: text,
                  level: alertKind,  
                  autoDismiss: autoDismiss
                });
            },

            getNotificationsStyle(){
                return {
                    Containers: {
                      bl: {
                        bottom: '10px',
                        left: '10px',
                      },
                    },
                    Title: {
                      DefaultStyle: { // Applied to every notification, regardless of the notification level
                        color:'#fff',
                        margin: '0 0 15px 0',
                        fontWeight:'500',
                        fontSize: 16, 
                        fontFamily: 'Roboto, sans-serif',
                        letterSpacing: '0.5px'
                      }
                    },
                    MessageWrapper: {
                      DefaultStyle: {
                        overflowY: 'auto',
                        height: '100%',
                        maxHeight: 275 
                      }
                    },
                    NotificationItem: { // Override the notification item
                        success: {
                            backgroundColor: 'rgb(86, 182, 49)',
                        },
                    
                        error: {
                            backgroundColor: 'rgb(207, 60, 62)',
                        },
                    
                        warning: {
                            backgroundColor: 'rgb(243,156,18)',
                            // backgroundColor: 'rgb(42, 54, 64)',
                        },
                    
                        info: {
                            backgroundColor: 'rgb(0, 133, 194)',
                        },
                
                        DefaultStyle: { // Applied to every notification, regardless of the notification level
                            color:'#fff',
                            width: 300,
                            border:0,
                            fontWeight:'400',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 14,
                            minHeight: 80,  
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden' ,
                            maxHeight: 350,
                        }
                    },
                    Dismiss: {
                      DefaultStyle: {
                        backgroundColor: 'none',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight:500,
                        fontSize: 20,
                        top: 8,
                        right: 8
                      }
                    }
                  };
            },   

            render() {
                return (
                    <NotificationSystem ref="notificationSystem" style={this.getNotificationsStyle()} />
                )

            }            
        }
    }
}