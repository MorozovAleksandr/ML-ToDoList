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
import { withRouter } from 'react-router';
import { myEvents } from '../../../events';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './SignIn.css'

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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinAccountStatus, setSigninAccountStatus] = useState(null); // null - ещё не зашли. 1 - Зашли успешно. 2 - Ошибка. 3 - ожидание, крутим волчок);
    const [error, setError] = useState('');
    const [showPassword, setShopPassword] = useState(false);
    const [validateDataEmail, setValidateDataEmail] = useState({
        status: false,
        validationMessage: 'Не корректный e-mail',
        onBlur: false
    });
    const [validateDataPassword, setValidateDataPassword] = useState({
        status: false,
        validationMessage: 'Минимум 8 символов',
        onBlur: false
    });
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShopPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleChange(e) {
        e.target.id === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
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
                } else {
                    setValidateDataPassword({ ...validateDataPassword, status: false });
                }
                break;
            default:
                break;
        }
    }

    function onBlurField(e) {
        e.target.id === 'email' ? setValidateDataEmail({ ...validateDataEmail, onBlur: true }) : setValidateDataPassword({ ...validateDataPassword, onBlur: true });
    }

    function signInAccount(e) {
        e.preventDefault();
        setSigninAccountStatus(3);
        let promise = new Promise((resolve, reject) => {
            myEvents.emit('EsignInAccount', email, password, resolve, reject);
        });
        promise
            .then(result => {
                setSigninAccountStatus(1);
                props.history.push("/");
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setSigninAccountStatus(2);
            });
    }

    return (
        <div className="signin__wrapper">
            <Container className="signin_container" component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {
                        (signinAccountStatus === null || signinAccountStatus === 2)
                            ?
                            <form className={classes.form} noValidate onSubmit={signInAccount}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    onChange={handleChange}
                                    value={email}
                                    onBlur={onBlurField}
                                />
                                {
                                    (!validateDataEmail.status && email && validateDataEmail.onBlur) &&
                                    <div className="signin__validateMessage">{validateDataEmail.validationMessage}</div>
                                }
                                <Grid className="signin__grid">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        value={password}
                                        onBlur={onBlurField}
                                    />

                                    <IconButton
                                        className="signin__visibilityPassword"
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </Grid>

                                {
                                    (!validateDataPassword.status && password && validateDataPassword.onBlur) &&
                                    <div className="signin__validateMessage">{validateDataPassword.validationMessage}</div>
                                }

                                {
                                    error &&
                                    <div className="signin__validateMessage">{error}</div>
                                }

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={!(validateDataPassword.status && validateDataEmail.status)}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <NavLink className="signin__link" to="/signup" activeClassName="SActivated" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </form>
                            :
                            <CircularProgress className="signin__circularProgress" />
                    }
                </div>
            </Container>
        </div>
    );
}

export default withRouter(SignIn);