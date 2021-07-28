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
import { myEvents } from '../../../events';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './Registration.css';

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



function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [validateDataEmail, setValidateDataEmail] = useState({
        status: false,
        validationMessage: 'Не корректный e-mail'
    });
    const [validateDataPassword, setValidateDataPassword] = useState({
        status: false,
        validationMessage: 'Минимум 8 символов'
    });
    const [showPassword, setShopPassword] = useState(false);
    const [validateDataPasswordRepeat, setValidateDataPasswordRepeat] = useState({
        status: false,
        validationMessage: 'Пароли не совпадают'
    });
    const [error, setError] = useState('');
    const [createAccountStatus, setCreateAccountStatus] = useState(null); // null - ещё не создавался. 1 - Создан успешно. 2 - Ошибка. 3 - ожидание, крутим волчок);



    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShopPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleChange(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
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
            case 'email':
                if (/.+@.+\..+/.test(value)) {
                    setValidateDataEmail({ ...validateDataEmail, status: true });
                } else {
                    setValidateDataEmail({ ...validateDataEmail, status: false });
                }
                break;
            case 'password':
                if (value.length >= 8) {
                    setValidateDataPassword({ ...validateDataPassword, status: true });
                    if (value !== validateDataPasswordRepeat) {
                        setValidateDataPasswordRepeat({ ...validateDataPasswordRepeat, status: false });
                    }
                } else {
                    setValidateDataPassword({ ...validateDataPassword, status: false });
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

    function createAccount(e) {
        e.preventDefault();
        setCreateAccountStatus(3);
        let promise = new Promise((resolve, reject) => {
            myEvents.emit('EcreateAccount', email, password, resolve, reject);
        });
        promise
            .then(result => {
                setCreateAccountStatus(1);
            })
            .catch(error => {
                setError(error.message);
                setCreateAccountStatus(2);
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
                        Sign up
                    </Typography>

                    {
                        (createAccountStatus === null || createAccountStatus === 2)
                            ?
                            <form className={classes.form} noValidate onSubmit={createAccount}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={email}
                                        />
                                    </Grid>

                                    {
                                        (!validateDataEmail.status && email) &&
                                        <div className="signup__validateMessage">{validateDataEmail.validationMessage}</div>
                                    }

                                    <Grid className="signup__grid" item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            value={password}

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
                                        (!validateDataPassword.status && password) &&
                                        <div className="signup__validateMessage">{validateDataPassword.validationMessage}</div>
                                    }

                                    <Grid className="signup__grid" item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Repeat Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="passwordRepeat"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            value={passwordRepeat}
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
                                        (!validateDataPasswordRepeat.status && passwordRepeat) &&
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
                                    onClick={createAccount}
                                    disabled={!(validateDataPasswordRepeat.status && validateDataPassword.status && validateDataEmail.status)}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <NavLink className="signup__link" to="/signin" variant="body2">
                                            Already have an account? Sign in
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </form>
                            :
                            createAccountStatus === 1
                                ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h2 className="signup__successTitle">Ваш аккаунт успешно создан!</h2>
                                        <NavLink to="/signin" variant="body2">
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                            >
                                                Войти в аккаунт
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

export default SignUp;