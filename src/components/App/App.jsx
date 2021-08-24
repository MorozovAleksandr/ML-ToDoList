import React from "react";
import Lists from "../Lists/Lists.jsx";
import LogIn from "../LogIn/LogIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import dataJson from '../../data.json';
import { myEvents } from '../../events';
import { Route } from 'react-router-dom';
import SignIn from '../LogIn/SignIn/SignIn.jsx';
import Registration from '../LogIn/Registration/Registration.jsx';
import UpdatePassword from '../LogIn/UpdatePassword/UpdatePassword.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import crypto from "crypto";
import RecycleBin from './../RecycleBin/RecycleBin';
import { authenticationUserAC, signInAccountAC, signOutAccountAC } from '../../redux/action/action.js';
import withTodoListService from '../hoc/withTodoListService';
import 'firebase/auth';
import 'firebase/database';
import "./App.css";
import RecycleBinButton from "../RecycleBinButton/RecycleBinButton.jsx";
import Notification from "../Notification/Notification.jsx";
import CalendarPage from "../CalendarPage/CalendarPage.jsx";

const initialRecycleBin = {
    lists: [],
    tasks: [],
    subtasks: []
}

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.idList = 1;
        this.state = {
            listsDefault: dataJson.lists.map(item => this.createTodoList(...item)),
        }
    }

    componentDidUpdate(prevProps) {
        const { user, todolistService, activeToDoListId, lists, recycleBin } = this.props;
        if (user) {
            if (activeToDoListId !== prevProps.activeToDoListId) {
                todolistService.sendActiveToDoListIdToDB(user, activeToDoListId);
            }
            if (lists !== prevProps.lists) {
                todolistService.sendListToDB(user, lists);
            }
            if (recycleBin !== prevProps.recycleBin) {
                todolistService.sendRecycleBinToDB(user, recycleBin);
            }
        }
    }

    componentDidMount() {
        myEvents.addListener("EcreateAccount", this.createAccount);
        myEvents.addListener("EsignInAccount", this.signInAccount);
        myEvents.addListener("EsignOut", this.signOut);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                let listsRef = firebase.database().ref(`users/${uid}`);
                listsRef.get().then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        this.props.authenticationUserAC(uid, data.lists, data.activetodolistid ? data.activetodolistid : null, false, data.recyclebin ? data.recyclebin : initialRecycleBin);
                    } else {
                        this.props.authenticationUserAC(uid, null, null, false, initialRecycleBin);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                this.props.authenticationUserAC(false, this.state.listsDefault, null, false, initialRecycleBin);
            }
        });
    }

    componentWillUnmount() {
        myEvents.removeListener("EcreateAccount", this.createAccount);
        myEvents.removeListener("EsignInAccount", this.signInAccount);
        myEvents.removeListener("EsignOut", this.signOut);
    }

    createTodoList = (label, list) => {
        return {
            id: crypto.randomBytes(3).toString("hex"),
            label: label,
            toDoList: list
        }
    }

    createAccount = (email, password, resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.props.todolistService.sendListToDB(response.user.uid, this.state.listsDefault, true);
                resolve(response);
            })
            .catch(error => reject(error));
    }

    signInAccount = (email, password, resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                resolve(response);
                let listsRef = firebase.database().ref(`users/${response.user.uid}`);
                listsRef.get().then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        this.props.authenticationUserAC(response.user.uid, data.lists, null, false, data.recyclebin ? data.recyclebin : initialRecycleBin);
                    } else {
                        this.props.authenticationUserAC(response.user.uid, null, null, false, initialRecycleBin);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            })
            .catch(error => reject(error));
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.signOutAccountAC(this.state.listsDefault);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <Notification />
                {
                    this.props.loading &&
                    <div className="wrapper__circularProgress">
                        <CircularProgress className="circularProgress" />
                    </div>
                }
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={Registration} />
                <Route path="/recyclebin" component={RecycleBin} />
                <Route path="/updatepassword" component={UpdatePassword} />
                <Route path="/calendar" component={CalendarPage} />
                <Route path="/" exact render={() =>
                    <div>
                        <div className="sideMenu">
                            <RecycleBinButton />
                            <LogIn user={this.props.user} />
                        </div>

                        <div className="content">
                            <Lists lists={this.props.lists} />
                            {
                                this.props.activeToDoListId &&
                                <ToDoList activeToDoList={this.props.lists.find(item => item.id === this.props.activeToDoListId)} />
                            }

                            {
                                !this.props.activeToDoListId &&
                                <CalendarPage />
                            }
                        </div>
                    </div>
                } />
            </div>
        )
    }
}

const mapStateToProps = ({ user, loading, activeToDoListId, lists, recycleBin }) => {
    return {
        user,
        loading,
        activeToDoListId,
        lists,
        recycleBin
    }
}

const mapDispatchToProps = {
    authenticationUserAC,
    signInAccountAC,
    signOutAccountAC
}

export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(App));
