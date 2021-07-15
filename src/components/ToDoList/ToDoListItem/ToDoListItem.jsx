import React from "react";
import './ToDoListItem.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

function ToDoListItem(props) {
    return (
        <div className="ToDoListItem">
            {props.item.label}
            <div className="ToDoListItem__buttons">
                <IconButton className="ToDoListItem__button ToDoListItem__button_marginRight" onClick={() => { props.cbUpdateEditToDoListItemId(props.item.id) }} color="inherit" aria-label="edit">
                    <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton className="ToDoListItem__button" onClick={() => { props.cbDeleteItem(props.item.id) }} color="inherit" aria-label="delete">
                    <DeleteOutlinedIcon fontSize="medium" />
                </IconButton>
            </div>
        </div>
    )
}

export default ToDoListItem;