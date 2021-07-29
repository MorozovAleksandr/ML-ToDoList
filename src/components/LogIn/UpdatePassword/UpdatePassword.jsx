import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import firebase from 'firebase/app';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [validateDataOldPassword, setValidateDataOldPassword] = useState({
        status: false,
        validationMessage: 'Минимум 8 символов',
        onBlur: false
    });
    const [validateDataPassword, setValidateDataPassword] = useState({
        status: false,
        validationMessage: 'Минимум 8 символов',
        onBlur: false
    });
    const [validateDataPasswordRepeat, setValidateDataPasswordRepeat] = useState({
        status: false,
        validationMessage: 'Пароли не совпадают',
        onBlur: false
    });
    const [showPassword, setShopPassword] = useState(false);
    const [error, setError] = useState('');
    const [updatePasswordStatus, setUpdatePasswordStatus] = useState(null); // null - ещё не создавался. 1 - Создан успешно. 2 - Ошибка. 3 - ожидание, крутим волчок);


    function onBlurField(e) {
        if (e.target.id === 'oldPassword') {
            setValidateDataOldPassword({ ...validateDataOldPassword, onBlur: true });
        }

        if (e.target.id === 'password') {
            setValidateDataPassword({ ...validateDataPassword, onBlur: true });
        }

        if (e.target.id === 'passwordRepeat') {
            setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, onBlur: true });
        }
    }

    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShopPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleChange(e) {
        if (e.target.id === 'oldPassword') {
            setOldPassword(e.target.value)
        }

        if (e.target.id === 'password') {
            setPassword(e.target.value)
        }

        if (e.target.id === 'passwordRepeat') {
            setPasswordRepeat(e.target.value)
        }
        validation(e.target.id, e.target.value);
    }

    function validation(field, value) {
        switch (field) {
            case 'oldPassword':
                if (value.length >= 8) {
                    setValidateDataOldPassword({ ...validateDataOldPassword, status: true });
                } else {
                    setValidateDataOldPassword({ ...validateDataOldPassword, status: false });
                }
                break;
            case 'password':
                if (value.length >= 8) {
                    setValidateDataPassword({ ...validateDataPassword, status: true });
                    if (value !== passwordRepeat) {
                        setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: false });
                    }
                } else {
                    setValidateDataPassword({ ...validateDataPassword, status: false });
                }
                if (passwordRepeat === value) {
                    setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: true });
                } else {
                    setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: false });
                }
                break;
            case 'passwordRepeat':
                if (value === password) {
                    setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: true });
                } else {
                    setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: false });
                }
                break;
            default:
                break;
        }
    }

    function updatePassword(e) {
        e.preventDefault();
        setUpdatePasswordStatus(3);
        const user = firebase.auth().currentUser;
        // TODO(you): prompt the user to re-provide their sign-in credentials
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPassword
        );
        user.reauthenticateWithCredential(credential).then(() => {
            user.updatePassword(password).then((result) => {
                setUpdatePasswordStatus(1);
            }).catch((error) => {
                setError(error.message);
                setUpdatePasswordStatus(2);
            });
        }).catch((error) => {
            setError(error.message);
            setUpdatePasswordStatus(2);
        });


    }
    return (
        <div className="signup__wrapper">
            <Container component="main" className="signup_container" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>

                    {
                        (updatePasswordStatus === null || updatePasswordStatus === 2)
                            ?
                            <form className={classes.form} noValidate onSubmit={updatePassword}>
                                <Grid container spacing={2}>
                                    <Grid className="signup__grid" item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Old password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="oldPassword"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={oldPassword}
                                            onBlur={onBlurField}
                                        />
                                        <IconButton
                                            className="signup__visibilityPassword"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </Grid>

                                    {
                                        (!validateDataOldPassword.status && oldPassword && validateDataOldPassword.onBlur) &&
                                        <div className="signup__validateMessage">{validateDataOldPassword.validationMessage}</div>
                                    }

                                    <Grid className="signup__grid" item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="New password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={password}
                                            onBlur={onBlurField}
                                        />
                                        <IconButton
                                            className="signup__visibilityPassword"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </Grid>

                                    {
                                        (!validateDataPassword.status && password && validateDataPassword.onBlur) &&
                                        <div className="signup__validateMessage">{validateDataPassword.validationMessage}</div>
                                    }

                                    <Grid className="signup__grid" item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Repeat new password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="passwordRepeat"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={passwordRepeat}
                                            onBlur={onBlurField}
                                        />
                                        <IconButton
                                            className="signup__visibilityPassword"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </Grid>

                                    {
                                        (!validateDataPasswordRepeat.status && passwordRepeat && validateDataPasswordRepeat.onBlur) &&
                                        <div className="signup__validateMessage">{validateDataPasswordRepeat.validationMessage}</div>
                                    }

                                </Grid>

                                {
                                    error &&
                                    <div className="signup__validateMessage">{error}</div>
                                }


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={updatePassword}
                                    disabled={!(validateDataPasswordRepeat.status && validateDataPassword.status && validateDataOldPassword.status)}
                                >
                                    Update password
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <NavLink className="signup__link" to="/" variant="body2">
                                            Return to app
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </form>
                            :
                            updatePasswordStatus === 1
                                ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h2 className="signup__successTitle">Ваш пароль успешно обновлён!</h2>
                                        <NavLink to="/" variant="body2">
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                            >
                                                Вернуться в приложение
                                            </Button>
                                        </NavLink>
                                    </Grid>
                                </Grid>
                                :
                                <CircularProgress className="signup__circularProgress" />
                    }



                </div>
            </Container>
        </div>
    );
};

export default UpdatePassword;