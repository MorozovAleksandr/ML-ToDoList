import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './AddToDoItem.css'
import Button from '@material-ui/core/Button';

function AddToDoItem(props) {
    const [label, setLabel] = useState('');

    const onLabelChange = (e) => {
        setLabel(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (label) {
            props.cbAddItem(label);
            setLabel('');
        }
    }

    return (
        <form className="addToDoItem" onSubmit={onSubmit}>
            <TextField className="addToDoItem__input" onChange={onLabelChange} id="standard-basic" value={label} label="What needs to be done" />
            <Button type='submit' variant="contained" color="primary">
                Add task
            </Button>
        </form>
    )
}

export default AddToDoItem;