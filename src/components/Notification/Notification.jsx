import React, { useState, useEffect } from 'react';
import './Notification.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearNotificationAC } from '../../redux/action/action';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        color: 'black'
    },
}));

const Notification = ({ notifacation, clearNotificationAC }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(notifacation.status);

    useEffect(() => {
        setOpen(notifacation.status);
    }, [notifacation]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        clearNotificationAC();
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert style={{ color: 'black' }} onClose={handleClose} severity={notifacation.color}>
                    {notifacation.text}
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = ({ notifacation }) => {
    return {
        notifacation
    }
}

const mapDispatchToProps = {
    clearNotificationAC
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);