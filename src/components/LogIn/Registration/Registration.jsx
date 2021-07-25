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
    const [error, setError] = useState('');
    const [createAccountStatus, setCreateAccountStatus] = useState(null); // null - ещё не создавался. 1 - Создан успешно. 2 - Ошибка. 3 - ожидание, крутим волчок);

    const classes = useStyles();

    function handleChange(e) {
        e.target.id === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
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
        <Container component="main" className="signup_wrapper" maxWidth="xs">
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
                                        autoComplete="email"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </Grid>
                                {
                                    error &&
                                    <div className="signup_error">{error}</div>
                                }

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        value={password}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={createAccount}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to="/signin" variant="body2">
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
    );
};

export default SignUp;