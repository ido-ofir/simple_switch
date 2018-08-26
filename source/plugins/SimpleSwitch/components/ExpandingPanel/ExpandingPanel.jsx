import {
  Icon,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  IconButton,
  ClickAwayListener
} from '@material-ui/core/';

require('./customs.scss');

module.exports = {
  name: "ExpandingPanel",
  description: '',
  propTypes: {
      // name: 'string',
  },
  dependencies: ['SimpleSwitch.Loader','SimpleSwitch.Badge'],
  get(Loader, Badge) {

      var core = this;

      var { React, PropTypes } = core.imports;

      return {
          propsTypes: {
            sectionKey: PropTypes.string.isRequired,
            childRender: PropTypes.func.isRequired,
            loadContent: PropTypes.func,
            iconSize: PropTypes.number,
            badge: PropTypes.number,
            badgePlacement: PropTypes.string, // left or right
            expandButton: PropTypes.bool,
            isLoading: PropTypes.bool,
            boxShadow: PropTypes.bool,
            open: PropTypes.bool,
            customClassName: PropTypes.string,
            actionButtons: PropTypes.array,
            openSearch: PropTypes.bool,
            onSearch: PropTypes.func,
            onClose: PropTypes.func,
            iconColor: PropTypes.string,
          },

          getDefaultProps(){
              return {
                badge: 0,
                iconSize: 16,
                iconColor: core.theme('colors.sectionsHeadLine'),
                expandButton: true,
                childRender: this.childRender,
                isLoading: false,
                open: false,
                customClassName: '',
                badgePlacement: 'right',
                headerBorder: core.theme('colors.border'),
                boxShadow: false,
                forceOpen: false,
                openSearch: false,
                onSearch: () => {},
                onClose: () => {},
                loadContent: () => {},
              };
          },

          getInitialState() {
              return {
                  expanded: false,
                  searchValue:'',
              };
          },

          componentDidMount() {
            let { open } = this.props;

            core.on('openSection',this.openSection);

            this.setState({ expanded: open });
          },

          componentWillReceiveProps (nextProps) {
            let {openSearch, forceOpen, name} = nextProps;
            let {expanded} = this.state;

            if(openSearch && !expanded){
              this.setState( {expanded: true} )
            }

            if(forceOpen && !expanded && name == this.props.name){
              this.setState( {expanded: true} )
            }
          },

          componentWillUnmount () {
            core.off('openSection',this.openSection);
          },

          openSection(object){
            let { sectionKey } = this.props;
            if(sectionKey === object.sectionKey){
              this.setState( {expanded: true} );
            }
          },

          handleChange(){
            let { expanded } = this.state;
            let { isLoading, loadContent, onClose } = this.props;
            if(isLoading) return;

            if(!expanded){
              loadContent();
              if (onClose) onClose()
            }
            this.setState({ expanded: !expanded });
          },

          handleKeyPress(event){
            let { openSearch } = this.props;

            if(!openSearch) return;

            if(event.keyCode === 27) {
              this.handleClose();
            }
          },

          handleClose(){
            let { closeSearch } = this.props;

            this.setState({searchValue:''})
            closeSearch()
          },

          handleSearch(e){
            this.setState({searchValue:e.target.value});
            this.props.onSearch(e.target.value);
          },

          renderGoBack(){
            let { iconSize } = this.props;
            let style = {
              color: core.theme('colors.gray4'),
              marginLeft: -10,
              marginRight: 5,
              cursor: 'pointer',
              width: 25, height: 25
            }


            return (
              <IconButton style={ style } title={ core.translate('Back')}  onClick={this.handleClose}>
                <Icon style={{fontSize: iconSize, color: core.theme('colors.actionIcons')}}>{ core.icons('goBack') }</Icon>
              </IconButton>
            )
          },

          renderInput(){
            let { searchValue } = this.state

            return(
              <ClickAwayListener onClickAway={ this.handleClose }>
                  <TextField

                    style= {styles.search}
                    onKeyDown={this.handleKeyPress}
                    onChange={ this.handleSearch }
                    margin= 'normal'
                    type= 'text'
                    value= { searchValue }
                    autoFocus={ true }/>

              </ClickAwayListener>

            )
          },

          renderSearch(){
            let { headerStyle, customClassName, openSearch } = this.props;

            if(!openSearch) return;


            return(
              <div style={{ ...styles.summary, ...headerStyle, background: core.theme('colors.gray11')  }} >
                <div style={ styles.searchCont }>
                    { this.renderGoBack() }
                    { this.renderInput() }
                </div>
              </div>
            )
          },

          renderName(){
            let { name, icon } = this.props;
            let { expanded } = this.state;
            return(
              <Typography style={{ color: core.theme('colors.sectionsHeadLine'),
              fontWeight: expanded ? 600 : 500, fontSize: 13, paddingLeft: icon && !_.isEmpty(icon) ? 0 : 30 }}>
                 { name }
              </Typography>
            )
          },

          renderBadge(){
            let { badge, badgePlacement, isLoading } = this.props;
            if (!badge) return null;
            return (
              <div style={{
                ...styles.badge,
                position: badgePlacement == 'right' ? 'absolute' : 'unset',
                color: core.theme('colors.primary'),
              }}>
                { isLoading ? '...' :  <Badge count={badge}/> }

              </div>
            )
          },

          renderIcon(){
            let { icon, iconSize, iconColor } = this.props;
            if (!icon) return null;
            return (
              <Icon style={{ fontSize: iconSize, color: iconColor, marginLeft: 25 ,marginRight: 10 }} >{ icon }</Icon>
            )
          },

          renderHeadline(){
            let { headerStyle, customClassName, openSearch } = this.props;
            let { expanded } = this.state;

            if(openSearch) return;


            return(
              <ExpansionPanelSummary style={{ ...styles.summary, ...headerStyle  }} >
                <div style={{ ...styles.expandButton, height: headerStyle && headerStyle.maxHeight ? headerStyle.maxHeight : 40 }} onClick={ this.handleChange }>
                  { this.renderExpandMoreIcon(expanded) }
                </div>

                <div style={{ display: 'flex', maxWidth: '85%', width: '100%' }} onClick={ this.handleChange }>
                    { this.renderIcon() }
                    { this.renderName() }
                    { this.renderBadge() }
                </div>

                { this.renderActionButtons() }
             </ExpansionPanelSummary>
            )
          },

          renderExpandMoreIcon(expanded){
            let {isLoading} = this.props;
            if(isLoading) return <Loader show={ true } size={'tiny'}/>

            return( <Icon style={{ fontSize: 20, color: core.theme('colors.actionIcons') }} >{ core.icons( expanded ? 'expandLess' : 'expandMore') }</Icon> )
          },

          renderActionButtons(){
            let { expanded } = this.state;
            let { headerStyle, actionButtons } = this.props;
            if (actionButtons) {
              return (
                <div style={{ ...styles.expandButton, width: 'auto', paddingRight: 0, left: 'unset', right: 5, height: headerStyle.maxHeight || 40 }}
                onClick={e=>{ e.preventDefault() }}>
                  { actionButtons }
                </div>
              )
            }
            return null;
          },

          childRender(content, itemKey){
            if (this.props.childRender)  { return this.props.childRender(content, itemKey); }
            else {
              return  _.map(content, (per, idx)=>{
                return <div key={idx}>{ per.name }</div>
              });
            }
          },

          render() {

              let { customClassName, style, isLoading, childWrapStyle, boxShadow } = this.props;
              let { expanded } = this.state;

              return (
                <ExpansionPanel className={ customClassName+` ${!boxShadow ? 'no_boxshadow' : ''}` }
                                style={{ ...style }}
                                expanded={ expanded }>

                    { this.renderHeadline() }
                    { this.renderSearch() }

                  <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column', padding: 0, ...childWrapStyle }}>
                    { this.childRender() }
                  </ExpansionPanelDetails>

                </ExpansionPanel>
              )

          }
      }
  }
}
let styles = {
  expandButton: {
    position: 'absolute',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '10px',
    top: 0
  },

  badge: {
    marginLeft: 5,
    fontSize: 13,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '55px'
  },
  summary: {
    padding: '0 10px',
    display: 'flex',
    alignItems:'center',
    maxHeight: 40,
    minHeight: 40,
    textTransform: 'uppercase'
  },

  searchCont:{
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },

  search:{
    width: '100%',
    marginBottom: 15
  }

}
