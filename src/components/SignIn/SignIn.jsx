import React from "react";
import s from './SignIn.module.css';
import Button from '@material-ui/core/Button';


class SignIn extends React.PureComponent {

    testOnclick = (text) => {
        console.log(text);
    }

    render() {
        console.log('render Sign in');
        return (
            <div className={s.signInWrapper}>
                <Button onClick={() => { this.testOnclick('Sign In') }} className={s.signInButton} variant="contained" color="primary">
                    Войти
                </Button>
                <Button onClick={() => { this.testOnclick('Registation') }} className={s.signInButton} variant="contained" color="primary">
                    Регистрация
                </Button>
            </div>
        )
    }
}

export default SignIn;