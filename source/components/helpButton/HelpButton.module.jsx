import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


const compStyles = {
    helpIcon:{
        marginLeft:8
    }
}
core.Component('HelpButton', ['mui.FusionIcon'], (FusionIcon) => {

    return {

        render() {
            let { placement="right", description, iconColor = core.theme('colors.gray4') , iconSize=16, icon = core.icons('fillHelp'), style={} } = this.props;
            return (
                <Tooltip 
                    placement={placement}
                    PopperProps={{ style: { pointerEvents: 'none'} }}
                    title={description}>
                    <div style={{...compStyles.helpIcon, ...style}}>
                        <FusionIcon
                            icon={icon}
                            size={iconSize}
                            color={iconColor}
                        />
                    </div>
                </Tooltip>
            )
        }
    }
});
