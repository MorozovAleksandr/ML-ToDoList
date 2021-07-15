import React from "react";
import s from './SignIn.module.css';
import Button from '@material-ui/core/Button';


const SignIn = React.memo(() => {
    const testOnclick = (text) => {
        console.log(text);
    }
    return (
        <div className={s.signInWrapper}>
            <Button onClick={() => { testOnclick('Sign In') }} className={s.signInButton} variant="contained" color="primary">
                Sign In
            </Button>
            <Button onClick={() => { testOnclick('Registation') }} className={s.signInButton} variant="contained" color="primary">
                Registation
            </Button>
        </div>
    )
});

export default SignIn;