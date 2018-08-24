
import {
    Button,
    Icon,
    Tooltip,
  } from '@material-ui/core/';

module.exports = {
    name: "CopyToClipboard",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.helper'],

    get(Helper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                tooltipText: PropTypes.string,
                tooltipPosition: PropTypes.string,
                copyNode: PropTypes.string.isRequired
            },

            getDefaultProps(){
                return {
                    size: 20,
                    tooltipText: core.translate('Copy to clipboard'),
                    tooltipPosition: 'bottom',
                    copyNode: 'example' ,
                    color: core.theme("colors.gray3")
                };
            },

            getInitialState(){
                return {
                    snackbarText: this.props.copyNode,
                    snackbarOpen: false
                }
            },

            componentDidMount() {
            },

            renderIcon(){
                let { size, color } = this.props;

                let style = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: size,
                    height: size,
                    fontSize: size,
                    color: color
                }

                return (
                    <Icon style={style}>
                          { core.icons('fileCopy') }
                    </Icon>
                )
            },

            CopyTopClipboard(e){

                let { copyNode } = this.props;
                e.preventDefault();
                e.stopPropagation();

                const hanleError = (err) => {

                    let notify = {
                        title: 'Could not copy text',
                        text: err,
                        alertKind: 'error'
                    }

                    core.emit('notify',notify);
                };

                const handleSuccess = () => {
                    var text = core.translate('Copied to clipboard successfully!');

                    let notify = {
                        title: copyNode,
                        text: text,
                        alertKind: 'info'
                    }

                    core.emit('notify',notify);
                };

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(copyNode).then( handleSuccess, hanleError );
                } else {
                  const el = document.createElement('textarea');
                  el.value = copyNode;
                  el.style.display = 'none';
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  handleSuccess()
                }

            },
            handleClose(){
                this.setState({ snackbarOpen: false, snackbarText: '' });
            },
            render() {

                let { tooltipText } = this.props;
                return (
                    <div>

                        <Button
                            size={ "small" }
                            mini={ true }
                            style= { styles.button }
                            onClick={ this.CopyTopClipboard } >

                            <div title={ tooltipText } >
                                { this.renderIcon() }
                            </div>

                        </Button>
                    </div>
                )


            }
        }
    }
}

let styles = {
    button: {
        minWidth: 32,
        borderRadius: '50%',
        cursor: 'pointer'
    }
}
