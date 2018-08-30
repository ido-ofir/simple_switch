
import {
  Typography, AppBar, Toolbar, IconButton,
  Paper, Tabs, Tab, Icon, Menu, Divider,
  MenuItem, MenuList, Popper
} from '@material-ui/core';

module.exports = {
    name: "NestedMenu",
    description: '',
    dependencies: [],

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                count: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    size:1,
                    count:0
                };
            },

            getInitialState() {
                return {
                  anchorEl: null,
                  menuAnchorEl: null,
                };
            },

            componentDidMount() {
              this.setState({ list: this.props.list })
            },
            componentWillReceiveProps(nextProps) {
              if (nextProps.list && (!_.isEqual(nextProps.list, this.props.list))) {
                this.setState({ list: nextProps.list })
              }
            },

            componentDidCatch(err){},

            openMenu(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            closeMenu(e){
              this.setState({ anchorEl: null })
            },

            openInnerMenu(e){
              this.setState({ menuAnchorEl: e.currentTarget })
            },

            closeInnerMenu(e){
              this.setState({ menuAnchorEl: null })
            },

            closeMenus(){
              this.closeMenu();
              this.closeInnerMenu();
            },

            renderMenuItem(item, idx){
              if (!item) return null;
              if (item.divider) return ( <Divider key={ idx } style={{ margin: '5px 0' }} /> );
              if (item.nested && item.nested.length) return this.renderNestedItem(item, idx);
              return (<MenuItem key={ idx } style={ styles.menuItem } onClick={ item.onClick }>  { item.label }</MenuItem>)
            },

            getPosition(){
              var nestingItem = document.getElementById('nestingItem');
              var windowWidth = window.innerWidth;
              var defaultPos = 'right-start';
              if (!nestingItem) return;
              
              var pos = nestingItem.getBoundingClientRect()
              if (pos.right > (windowWidth/2)) {
                defaultPos = 'left-start'
              }
              return defaultPos;
            },

            renderNestedItem(item, idx){
              let { nested, label } = item;
              let { menuAnchorEl } = this.state;
              return (
                <MenuItem id={'nestingItem'} key={ idx } style={ styles.menuItem } onMouseEnter={ this.openInnerMenu } onMouseLeave={ this.closeInnerMenu }>
                  {  label }
                  <Icon style={{ position: 'absolute', right: 5, color: core.theme('colors.dark') }}>{ core.icons('arrow_right') }</Icon>
                  <Popper
                        onMouseLeave={ this.closeInnerMenu }
                        anchorEl={menuAnchorEl}
                        open={ Boolean(menuAnchorEl) }
                        placement={ this.getPosition() }
                        style={{ zIndex: 1301 }}
                        onClose={ this.closeInnerMenu }>

                        { this.renderInnerMenu(nested) }

                  </Popper>
                </MenuItem>
              );
            },

            renderInnerMenu(items){
              if (!items || !items.length) return null;
              return (
                <Paper elevation={ 5 } style={{ width: 220 }}>
                {
                  _.map(items, this.renderMenuItem)
                }
                </Paper>
              )
            },

            render() {
                let { list, anchorEl } = this.state;
                if (!list) return null;
                return (
                    <div>
                      <IconButton
                              style={{ height: 40, width: 40 }}
                              size={ 'small' }
                              onClick={ this.openMenu }>
                        <Icon style={{ cursor: 'pointer', marginRight: 5 }} >{ core.icons('more') }</Icon>
                      </IconButton>

                      <Menu
                        MenuListProps={{ style: { width: 220, borderRadius: 0 }, dense: true }}
                        anchorEl={anchorEl}
                        style={{ borderRadius: 0 }}
                        open={ Boolean(anchorEl) }
                        onClose={ this.closeMenu } >

                        { _.map(list, this.renderMenuItem) }

                      </Menu>
                    </div>
                )
            }
        }
    }
};

let styles = {
  menuItem: {
    height: 'auto',
    padding: '5px 5px 5px 24px',
    fontSize: '12px',
    height: '20px',
  }
}
