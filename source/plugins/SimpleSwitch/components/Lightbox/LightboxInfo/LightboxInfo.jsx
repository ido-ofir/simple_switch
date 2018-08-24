
module.exports = {
    name: "LightboxInfo",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                hasInfo: PropTypes.bool.isRequired,
                showInfo: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    hasInfo: true,
                    showInfo: true, //false,
                    children: (
                        <div>
                            1<br/>
                            2<br/>
                            3<br/>
                            4<br/>
                            5<br/>
                            6<br/>
                            7<br/>
                            8<br/>
                            9<br/>
                            10<br/>
                            11<br/>
                            12<br/>
                            13<br/>
                            14<br/>
                            15<br/>
                            16<br/>
                            17<br/>
                            18<br/>
                            19<br/>
                            20<br/>
                            21<br/>
                        </div>
                    ),
                };
            },
            
            getInitialState() {
                return {
                    isOpen: true, //false,
                };
            },

            componentDidMount() {
                let {showInfo} = this.props;
                if (showInfo) {
                    this.setState({isOpen: showInfo});
                }
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.showInfo !== this.state.isOpen){
                    this.setState({isOpen: nextProps.showInfo});
                }
            },

            styles(s) {
                let {isOpen} = this.state;
                let styles = {
                    root: {
                        position: 'absolute',
                        right: isOpen ? 0 : -400,
                        width: 300,
                        height: '100%',
                        background: core.theme('colors.white'),
                        color: core.theme('colors.gray3')
                    },
                }
                return(styles[s]);
            },

            render() {
                let {children, hasInfo} = this.props;
                
                if (!hasInfo) return null;
                return (
                    <div id={'LightboxInfo.root'} style={ this.styles('root') }>
                        {children}
                    </div>
                )
            }
        }
    }
};