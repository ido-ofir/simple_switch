import React from 'react';
import ReactDOM from 'react-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

var PropTypes = require('prop-types');

core.Component('mui.Modal', ['mui.LoaderButton', 'mui.Badge', 'mui.FusionIcon'], (LoaderButton, Badge, FusionIcon) => {

    return {

        mixins: [],

        render() {
            let { disableSubmit=false, open=true, close, loading, title,
                  children, onSubmit, actionsContainerStyle, cancelButtonLabel, submitButtonLabel,
                  width, bodyStyle, titleStyle, style, titleBadge,
                  titleBadgeStyle={}, leftActionsContainerChildren=null, ...props 
                } = this.props;

            width = width || 426;
            cancelButtonLabel = cancelButtonLabel ? cancelButtonLabel : core.translate('modal.cancel.button.label', 'cancel');
            submitButtonLabel = submitButtonLabel ? submitButtonLabel : core.translate('modal.submit.button.label', 'submit');
            title = title || 'title';
            const defaultActions = [
                <Button 
                    key={0}
                    onClick={close}
                    style={{'textTransform': 'uppercase', color: core.theme('colors.dark'), fontSize: 12}}
                >{cancelButtonLabel}</Button>,
                <LoaderButton 
                    key={1}
                    onSubmit={onSubmit} 
                    label={submitButtonLabel} 
                    style={{'textTransform': 'uppercase', background: core.theme('colors.secondary'), color: core.theme('colors.white'), fontSize: 12}}
                    loading={loading}
                    disabled={disableSubmit}
                />
            ];

            let titleIcon = this.props.titleIcon || null;

            return (
                <Dialog
                    open={ open }
                    onClose={close}
                    {...props}
                >
                    <DialogTitle style={{padding: 0, background: core.theme('colors.primary'), height: 40, paddingTop: 3}}>
                        <div style={{padding: '0 0 0 11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {titleIcon}
                            <div style={{fontSize: 13, color: core.theme('colors.white')}}>
                                {title}
                                {titleBadge ? <Badge amount={titleBadge} style={titleBadgeStyle}>{''}</Badge> : null}
                            </div>
                            <IconButton
                                children={ 
                                    <FusionIcon 
                                        icon={core.icons('close')}
                                        size={22} 
                                        color={core.theme('colors.white')} 
                                    />
                                }
                                style={{width: 36, height: 36, padding: 0}}
                                onClick={close}
                            />
                        </div>
                    </DialogTitle>
                    <DialogContent style={{'width': width, ...bodyStyle}}>{ children }</DialogContent>
                    <DialogActions style={{position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 8}}>
                        <div>
                            {leftActionsContainerChildren}
                        </div>
                        <div>
                            {(this.props.actions && this.props.actions[0]) ? this.props.actions : defaultActions}
                        </div>
                    </DialogActions>
                </Dialog>
            );
        }
    }
});