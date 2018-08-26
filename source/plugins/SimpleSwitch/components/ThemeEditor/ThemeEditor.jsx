
import { Typography, AppBar, Paper, Tabs, Tab } from '@material-ui/core';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/kr_theme';


module.exports = {
    name: "ThemeEditor",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper', 'SimpleSwitch.NoResults', 'SimpleSwitch.Loader', 'SimpleSwitch.ExpandingPanel'],

    get(Helper, NoResults, Loader, ExpandingPanel) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                data: PropTypes.object,
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                  data: {},
                };
            },

            getInitialState() {

                return {
                  theme: []
                };
            },

            componentDidMount() {
                this.mapTheme(this.props.data);

                this.colorContainer = React.createRef();
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.data && !_.isEqual(nextProps.data, this.props.data)) {
                this.mapTheme(nextProps.data)

              }
            },

            mapTheme(theme) {
              var newobj = Helper.mapObject(theme);
              this.setState({ theme: newobj });
            },

            renderList(data){
              // console.debug('this.colorContainer > ', this.colorContainer);
              var width = 90;
              var height = 40;
              if (this.colorContainer.current) {
                width = Math.round(this.colorContainer.current.clientWidth / 6) - 30;
              }

              return (
                <div style={{ padding: '15px', maxHeight: 200, overflow: 'auto',  display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridGap: '15px' }}
                ref={ this.colorContainer }>
                {
                  _.map(data, (item, i)=>{
                    return (<Paper key={i} style={{ flex: 1, height: height, background: item.data }}>{item.title}</Paper>)
                  })
                }
                </div>
              )

            },
/*
<Paper key={ idx }>
  <Typography>
  { themeSection.title }
  </Typography>
</Paper>
*/
            renderThemeSection(themeSection, idx) {
              console.debug('themeSection > ', themeSection);
              let { title, data } = themeSection;
              return (

                <ExpandingPanel item={ themeSection }
                  name={ title }
                  badge={ data.length }
                  badgePlacement={ 'left' }
                  childRender={  this.renderList.bind(this, data)  }
                  key={ idx }
                />
              )
            },

            render() {
              let { theme } = this.state;
              return (

                  <div id={'root.themeEditor'} style={{ height: '100%', width: '100%', display: 'flex',  flexDirection: 'column' }}>
                    {
                      _.map(theme, this.renderThemeSection)
                    }
                  </div>
              )


            }
        }
    }
}
