import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';

import './EditForm.css';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditForm = ({ initialLabel, title, text, eventSave, eventClose, maxLength = "40" }) => {

    const [label, setLabel] = useState(initialLabel);
    const [open, setOpen] = useState(true);

    const onClose = () => {
        setLabel('');
        setOpen(false);
        eventClose();
    }

    const onSave = () => {
        setOpen(false);
        eventSave(label);
    }

    const onLabelChange = (e) => {
        setLabel(e.target.value);
    }

    const onKeyPressHandler = (e) => {
        if (e.charCode === 13 && label) {
            onSave();
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            color="primary"
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="EditToDoListItem__title" id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={onLabelChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label={text}
                    color="primary"
                    type="text"
                    fullWidth
                    value={label}
                    onKeyPress={onKeyPressHandler}
                    autoComplete="off"
                    inputProps={{ maxLength }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="medium" onClick={onClose}>Отменить</Button>
                <Button
                    className="saveButton"
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
    )
}

export default EditForm;