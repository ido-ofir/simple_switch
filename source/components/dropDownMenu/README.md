# Component DropDownMenu
## Description: 
`A dropdown list for menues`
### Unique Properties:
| Property | Type | Decription |
| -------- | ---- | ---------- |
| isOpen | Boolean |  to show / hide the list |
| close | Function |  a function handler to hide the list |
| handleOpenMenu | Function |  a function handler to show the list |
| title | String |  the title for the menu button |
| placement | String |  the position of the list |
| titleStyle | Objet |  the styles for the title |
| targetIcon | Node | an option to pass a custom icon to render instead of the original button |
| renderItemsList | Function | an option to pass a custom renderer function for the list items |
| targetIconDisbled | Boolean | whether the targetIcon should be disabled or not |
| menuWidth | Number | the width for the list |
| menuItemsData | Array | an array of data objects for the list items |
| itemLeftTextStyle | Object | the styles for the left side label of the list item |
| itemRightTextStyle | Object | the styles for the right side label of the list item |

### Usage example : 
```javascript
    <DropDownMenu 
        title={core.translate('project', 'Project')}
        titleStyle={{color: core.theme('colors.white'), fontSize: 11, marginRight: 3}}
        itemLeftTextStyle={{fontSize: 12, color: core.theme('colors.dark')}}
        itemRightTextStyle={{fontSize: 11, color: core.theme('colors.dark')}}
        isOpen={isOpen}
        close={this.closeMenu}
        handleOpenMenu={() => this.setState({isOpen: !isOpen})}
        menuWidth={200}
        menuItemsData={[
            {
                leftText: core.translate('file.menu.new.ddm.file', 'New DDM file'),
                rightText: core.translate('file.menu.new.ddm.file.keyboard.shortcut', 'Ctrl N'),
                onClick: this.handleNewDDMFile,
                renderBottomDivider: false
            },
            {
                leftText: core.translate('file.menu.open.ddm.file', 'Open DDM file'),
                rightText: core.translate('file.menu.open.ddm.file.keyboard.shortcut', 'Ctrl O'),
                onClick: this.handleOpenDDMFile,
                renderBottomDivider: true
            },
            {
                leftText: core.translate('file.menu.save', 'Save'),
                rightText: core.translate('file.menu.save.keyboard.shortcut', 'Alt S'),
                onClick: this.handleSave,
                renderBottomDivider: false
            },
            {
                leftText: core.translate('file.menu.save.as', 'Save As'),
                rightText: core.translate('file.menu.save.as.keyboard.shortcut', 'Alt Ctrl S'),
                onClick: this.handleSaveAs,
                renderBottomDivider: false
            },
            {
                leftText: core.translate('file.menu.publish', 'Publish'),
                rightText: core.translate('file.menu.publish.keyboard.shortcut', 'Alt Ctrl P'),
                onClick: this.handlePublish,
                renderBottomDivider: true
            },
            {
                leftText: core.translate('file.menu.import', 'Import'),
                rightText: core.translate('file.menu.import.keyboard.shortcut', 'Ctrl I'),
                onClick: this.handleImport,
                renderBottomDivider: false
            },
            {
                leftText: core.translate('file.menu.export', 'Export'),
                rightText: core.translate('file.menu.export.keyboard.shortcut', 'Alt Ctrl X'),
                onClick: this.handleExport,
                renderBottomDivider: false
            }
        ]}
    />
```