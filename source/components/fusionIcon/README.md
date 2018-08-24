# Component mui.FusionIcon
## Description: 
`An icon component that supports: material-icon / font-awesome / custom SVG icons`
### Unique Properties:
| Property | Type | Decription |
| -------- | ---- | ---------- |
| icon | String / Array / Object | the icon data |
| style | Object | the styles to apply to the icon element |
| size | Number | the size of the icon in pixels |
| color | String | the color for the icon |
| hoverColor | String | the color for the icon when hovered |
| isRawIcon | Boolean | set this to true if you pass the icon in a DDM theme object format |

### Usage example : 
```javascript
    <FusionIcon 
        icon={core.icons('settings')}
        size={14} 
        color={core.theme("colors.primary")}
    />
```