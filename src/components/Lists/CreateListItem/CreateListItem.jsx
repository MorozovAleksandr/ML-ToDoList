import React from "react";
import './CreateListItem.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import { addToDoList } from '../../../redux/action/action'
import { myEvents } from '../../../events';
import { connect } from "react-redux";
import withTodoListService from "../../hoc/withTodoListService";

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CreateListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            open: true,
        }
    }

    onLabelChange = (e) => {
        this.setState({ label: e.target.value });
    }

    onSave = () => {
        this.props.addToDoList(this.props.user, this.props.lists, this.state.label);
        myEvents.emit('EonCloseAddListForm');
        this.setState({ open: false });
    };

    onClose = () => {
        this.setState({
            label: '',
            open: false
        });
        myEvents.emit('EonCloseAddListForm');
    };

    onKeyPressHandler = (event) => {
        if (event.charCode === 13) {
            this.onSave();
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.onClose}
                    color="primary"
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle className="EditToDoListItem__title" id="alert-dialog-slide-title">Новый список</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.onLabelChange}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя списка"
                            color="primary"
                            type="text"
                            fullWidth
                            value={this.state.label}
                            onKeyPress={this.onKeyPressHandler}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" size="medium" onClick={this.onClose}>Отменить</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            onClick={this.onSave}
                            disabled={!this.state.label}
                            className="saveListButton"
                        >
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({ user, lists }) => {
    return {
        user,
        lists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        addToDoList: (user, lists, label) => {
            return addToDoList(todolistService, label, user, lists, dispatch)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(CreateListItem));