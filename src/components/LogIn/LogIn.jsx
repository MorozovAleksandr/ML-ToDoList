import React from "react";
import s from './LogIn.module.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { NavLink } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class LogIn extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    testOnclick = (text) => {
        console.log(text);
        this.handleClose();
    }

    render() {
        console.log('render Sign in');
        return (
            <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className={s.signIn__title} id="alert-dialog-slide-title">{"Для продолжения работы войдите или зарегестрируйтесь"}</DialogTitle>
                <DialogContent className={s.signIn__wrapper}>
                    <NavLink to="/signin" className={s.logIn__link} activeClassName="SActivated">
                        <Button onClick={() => { this.testOnclick('Sign In') }} className={s.signInButton} variant="contained" color="primary">
                            Войти
                        </Button>
                    </NavLink>
                    <NavLink to="/signup" className={s.logIn__link} activeClassName="SActivated">
                        <Button onClick={() => { this.testOnclick('Registation') }} className={s.signInButton} variant="contained" color="primary">
                            Регистрация
                        </Button>
                    </NavLink>
                </DialogContent>
            </Dialog>
        )
    }
}

export default LogIn;