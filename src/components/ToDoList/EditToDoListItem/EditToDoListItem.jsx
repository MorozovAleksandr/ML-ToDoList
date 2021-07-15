import React, { useState } from "react";
import './EditToDoListItem.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SaveIcon from '@material-ui/icons/Save';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});


function EditToDoListItem(props) {
    const [label, setLabel] = useState(props.editToDoListItem.label);

    const onLabelChange = (e) => {
        setLabel(e.target.value)
    }

    const [open, setOpen] = React.useState(true);

    const onSave = () => {
        const newToDoListItem = { ...props.editToDoListItem, label };
        props.cbUpdateToDoListItem(newToDoListItem, newToDoListItem.id)
        setOpen(false);
    };

    const handleClose = () => {
        setLabel('');
        props.cbUpdateEditToDoListItemId(null);
        setOpen(false);
    };

    const onKeyPressHandler = (event) => {
        if (event.charCode === 13) {
            onSave();
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                color="primary"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="EditToDoListItem__title" id="alert-dialog-slide-title">{props.activeToDoList}</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={onLabelChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Задача"
                        color="primary"
                        type="text"
                        fullWidth
                        value={label}
                        onKeyPress={onKeyPressHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="medium" onClick={handleClose}>Отменить</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={!label}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditToDoListItem;