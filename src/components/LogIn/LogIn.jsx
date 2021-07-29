import React, { Fragment } from "react";
import './LogIn.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { NavLink } from 'react-router-dom';
import { myEvents } from '../../events';

class LogIn extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            anchorEl: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                user: this.props.user
            })
        }
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    signOut = () => {
        myEvents.emit("EsignOut");
    }

    render() {
        const open = Boolean(this.state.anchorEl);
        return (
            <div className="signInWrapper">
                {this.state.user
                    ?
                    <div className="login__userMenu">
                        <IconButton className="login__buttonMenu" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <AccountBoxIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={open}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                            <NavLink to="/updatepassword" className="logIn__link logIn__link_changepassword" activeClassName="SActivated">
                                <MenuItem>Изменить пароль</MenuItem>
                            </NavLink>
                            <MenuItem onClick={this.signOut}>Выйти</MenuItem>
                        </Menu>
                    </div>
                    :
                    <Fragment>
                        <NavLink to="/signin" className="logIn__link" activeClassName="SActivated">
                            <Button className="signInButton" variant="contained" color="primary">
                                Войти
                            </Button>
                        </NavLink>
                        <NavLink to="/signup" className="logIn__link" activeClassName="SActivated">
                            <Button className="signInButton" variant="contained" color="primary">
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
