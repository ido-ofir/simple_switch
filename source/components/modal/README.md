# Component Modal
## Description: 
`A general button component for help hints`
### Unique Properties:
| Property | Type | Decription |
| -------- | ---- | ---------- |
| open | Boolean | whether to show / hide the modal |
| close | Function | a function that will set the open to false |
| title | String | the title for the modal |
| children | Node | the content for the modal |
| onSubmit | Function | the callback function to run on submit |
| actionsContainerStyle | Object | the styles to apply to the buttons container element |
| cancelButtonLabel | String | the button label for the cancel |
| submitButtonLabel | String | the button label for the submit |
| width | Number | the width of the modal |
| bodyStyle | Object | the styles to applay to the content container |
| titleStyle | Object | the styles to applay to the modal title element |
| titleBadge | Number | the number to display in a badeg on the title row |
| titleBadgeStyle | Object | the styles to apply to the title badge |
| leftActionsContainerChildren | Node | the element/s to render on the left side of the actions container |

### Usage example : 
```javascript
    <Modal 
        title={core.translate("ddm-manager.createEntity", 'CREATE ENTITY')}
        onSubmit={this.submit}
        cancelButtonLabel={core.translate("ddm-manager.createEntity.cancel", 'cancel')}
        submitButtonLabel={core.translate("ddm-manager.createEntity.create", 'create')}
        width={590}
        bodyStyle={{padding: '0px 24px 0px'}}
        open={this.props.isOpen}
        close={this.props.close}
        leftActionsContainerChildren={
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{fontSize: 12, fontWeight: 500, color: core.theme('colors.primary')}}>{core.translate("ddm-manager.createEntity.active", 'Active')}:</span>
                <Switch value={this.state.isActive} onChange={isActive => this.setState({isActive})}/>
            </div>
        }
    >
        <div style={{minHeight: 300}}>
            { this.renderCreateForm() }
        </div>
    </Modal>
```