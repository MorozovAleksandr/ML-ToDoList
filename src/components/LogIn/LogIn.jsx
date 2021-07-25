import React, { Fragment } from "react";
import s from './LogIn.module.css';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { myEvents } from '../../events';

class LogIn extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                user: this.props.user
            })
        }
    }

    signOut = () => {
        myEvents.emit("EsignOut");
    }

    render() {
        return (
            <div className={s.signInWrapper}>
                {this.state.user
                    ?
                    <Button onClick={this.signOut} className={s.signInButton} variant="contained" color="primary">
                        Выйти
                    </Button>
                    :
                    <Fragment>
                        <NavLink to="/signin" className={s.logIn__link} activeClassName="SActivated">
                            <Button className={s.signInButton} variant="contained" color="primary">
                                Войти
                            </Button>
                        </NavLink>
                        <NavLink to="/signup" className={s.logIn__link} activeClassName="SActivated">
                            <Button className={s.signInButton} variant="contained" color="primary">
                                Регистрация
                            </Button>
                        </NavLink>
                    </Fragment>
                }
            </div>
        )
    }
}

export default LogIn;

/* import React from "react";
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

export default LogIn; */