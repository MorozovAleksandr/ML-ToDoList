import React from "react";
import './ToDoListItem.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function ToDoListItem(props) {
    return (
        <div className="ToDoListItem">
            {props.item.label}
            <IconButton className="ToDoListItem__button" onClick={() => { props.cbDeleteItem(props.item.id) }} color="inherit" aria-label="delete">
                <DeleteIcon fontSize="large" />
            </IconButton>

        </div>
    )
}

export default ToDoListItem;