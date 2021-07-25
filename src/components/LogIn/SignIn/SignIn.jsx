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

    const classes = useStyles();

    function handleChange(e) {
        e.target.id === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
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
        <Container component="main" maxWidth="xs">
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
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                value={email}
                            />
                            {
                                error &&
                                <div className="signup_error">{error}</div>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <NavLink to="/signup" activeClassName="SActivated" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </form>
                        :
                        <CircularProgress className="signup__circularProgress" />
                }
            </div>
        </Container>
    );
}

export default withRouter(SignIn);