import React from "react";
import s from './SignIn.module.css';
import Button from '@material-ui/core/Button';

class SignIn extends React.Component {

    testOnclick = (text) => {
        console.log(text);
    }

    render() {
        return (
            <div className={s.signInWrapper}>
                <Button onClick={() => { this.testOnclick('Sign In') }} className={s.signInButton} variant="contained" color="primary">
                    Sign In
                </Button>
                <Button onClick={() => { this.testOnclick('Registation') }} className={s.signInButton} variant="contained" color="primary">
                    Registation
                </Button>
            </div>
        );
    }
}

export default SignIn;