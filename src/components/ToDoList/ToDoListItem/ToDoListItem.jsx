import React from "react";
import './ToDoListItem.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import { myEvents } from '../../../events';

class ToDoListItem extends React.PureComponent {

    onClickDone = (e) => {
        myEvents.emit('EtogglePropertyItem', this.props.item.id, 'done');
    }

    onClickImportant = (e) => {
        e.stopPropagation();
        myEvents.emit('EtogglePropertyItem', this.props.item.id, 'important');
    }

    onClickEdit = (e) => {
        e.stopPropagation();
        myEvents.emit('EupdateEditToDoListItemId', this.props.item.id);
    }

    onClickDelete = (e) => {
        e.stopPropagation();
        myEvents.emit('EdeleteItem', this.props.item.id);
    }

    render() {
        console.log('render task id: ' + this.props.item.id);
        return (
            <div className={`ToDoListItem ${this.props.item.done ? `done` : null} ${this.props.item.important ? `important_wrapper` : null}`} onClick={this.onClickDone} >
                <div className="ToDoListItem__leftBlock">
                    <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={this.onClickDone} color="inherit" aria-label="delete">
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    {this.props.item.label}
                </div>
                <div className="ToDoListItem__buttons">
                    <IconButton className={`ToDoListItem__button ToDoListItem__button_marginRight ${this.props.item.important ? `important` : ``}`} onClick={this.onClickImportant} color="inherit" aria-label="edit">
                        <StarIcon fontSize="medium" />
                    </IconButton>
                    <IconButton className="ToDoListItem__button ToDoListItem__button_marginRight" onClick={this.onClickEdit} color="inherit" aria-label="edit">
                        <EditIcon fontSize="medium" />
                    </IconButton>
                    <IconButton className="ToDoListItem__button" onClick={this.onClickDelete} color="inherit" aria-label="delete">
                        <DeleteOutlinedIcon fontSize="medium" />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default ToDoListItem;