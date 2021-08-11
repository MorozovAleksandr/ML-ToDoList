import React from "react";
import './AddToDoListItemSubTaskItem.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import { addSubTask } from '../../../../../../redux/action/action'
import { connect } from "react-redux";
import crypto from "crypto";
import withTodoListService from "../../../../../hoc/withTodoListService";

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

class AddToDoListItemSubTaskItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            open: true,
        }
    }

    createSubTask = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            taskId: this.props.taskId,
            listId: this.props.activeToDoListId,
            id: crypto.randomBytes(3).toString("hex")
        }
    };

    onLabelChange = (e) => {
        this.setState({ label: e.target.value });
    }

    onSave = () => {
        const subTask = this.createSubTask(this.state.label)
        this.props.addSubTask(subTask, this.props.user, this.props.lists, this.props.activeToDoListId, this.props.taskId)
        this.props.cbOnCloseAddSubTaskForm();
        this.setState({ open: false });
    };

    onClose = () => {
        this.setState({
            label: '',
            open: false
        });
        this.props.cbOnCloseAddSubTaskForm();
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
                    <DialogTitle className="EditToDoListItem__title" id="alert-dialog-slide-title">Новая подзадача</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.onLabelChange}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя подзадачи"
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

const mapStateToProps = ({ user, lists, activeToDoListId }) => {
    return {
        user,
        lists,
        activeToDoListId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        addSubTask: (subtask, user, lists, activeToDoListId, taskId) => {
            return addSubTask(todolistService, subtask, user, lists, activeToDoListId, taskId, dispatch)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(AddToDoListItemSubTaskItem));