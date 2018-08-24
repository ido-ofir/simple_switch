# Component Help button
## Description: 
`A general button component for help hints`
### Unique Properties:
| Property | Type | Decription |
| -------- | ---- | ---------- |
| description | String | the help text to display |
| iconColor | String | the color for the help icon |
| placement | String | the position for the help text |
| iconSize | Number | the size for the help icon |
| icon | String / Array / Object | the icon to render inside the help button |

### Usage example : 
```javascript
    <HelpButton 
        placement={'right'} 
        description={description} 
        icon={core.icons('fillHelp')} 
        iconSize={15} 
        iconColor={core.theme("colors.gray4")}
    />
```