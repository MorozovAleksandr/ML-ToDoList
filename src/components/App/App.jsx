import React from "react";
import Lists from "../Lists/Lists.jsx";
import LogIn from "../LogIn/LogIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import dataJson from '../../data.json';
import { myEvents } from '../../events';
import { Route } from 'react-router-dom';
import SignIn from '../LogIn/SignIn/SignIn.jsx';
import Registration from '../LogIn/Registration/Registration.jsx';
import firebase from 'firebase/app';
import crypto from "crypto";
import 'firebase/auth';
import 'firebase/database';
import "./App.css";

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.idList = 1;
        this.state = {
            activeToDoListId: null,
            lists: /* dataJson.lists.map(item => this.createTodoList(...item)) */[],
            listsDefault: dataJson.lists.map(item => this.createTodoList(...item)),
            user: false
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                let listsRef = firebase.database().ref(`users/${uid}/lists`);
                listsRef.get().then((snapshot) => {
                    const data = snapshot.val();
                    let updateData = [];
                    if (data) {
                        updateData = data.map(item => {
                            if (!('toDoList' in item)) {
                                return { ...item, toDoList: [] };
                            } else {
                                return item;
                            }
                        })
                    }
                    this.setState({
                        lists: updateData,
                        user: uid,
                    });
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                this.setState({
                    user: false,
                    lists: this.state.listsDefault
                })
            }
        });
    }

    componentDidMount() {
        myEvents.addListener("EaddTodoList", this.addTodoList);
        myEvents.addListener("EdeleteToDoList", this.deleteToDoList);
        myEvents.addListener("EupdateToDoListLabel", this.updateToDoListLabel);
        myEvents.addListener("EupdateActiveTodoListId", this.updateActiveTodoListId);
        myEvents.addListener("EupdateToDoList", this.updateToDoList);
        myEvents.addListener("EcreateAccount", this.createAccount);
        myEvents.addListener("EsignInAccount", this.signInAccount);
        myEvents.addListener("EsignOut", this.signOut);
    }

    componentWillUnmount() {
        myEvents.removeListener("EaddTodoList", this.addTodoList);
        myEvents.removeListener("EdeleteToDoList", this.deleteToDoList);
        myEvents.removeListener("EupdateToDoListLabel", this.updateToDoListLabel);
        myEvents.removeListener("EupdateActiveTodoListId", this.updateActiveTodoListId);
        myEvents.removeListener("EupdateToDoList", this.updateToDoList);
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

    addTodoList = (label) => {
        const newList = this.createTodoList(label, []);
        this.setState({
            lists: [...this.state.lists, newList]
        }, () => {
            this.sendListToDB(this.state.user, [...this.state.lists])
        })
    }

    deleteToDoList = (id) => {
        this.setState(({ lists }) => {
            const idx = lists.findIndex(item => item.id === id);
            const before = lists.slice(0, idx);
            const after = lists.slice(idx + 1);
            if (id === this.state.activeToDoListId) {
                return {
                    lists: [...before, ...after],
                    activeToDoListId: null
                }
            } else {
                return {
                    lists: [...before, ...after]
                }
            }
        }, () => {
            this.sendListToDB(this.state.user, [...this.state.lists])
        })
    }

    updateToDoListLabel = (id, label) => {
        this.setState(({ lists }) => {
            const idx = lists.findIndex(item => item.id === id);
            const before = lists.slice(0, idx);
            const after = lists.slice(idx + 1);
            const updateToDoList = { ...lists[idx], label: label };
            return {
                lists: [...before, updateToDoList, ...after]
            }
        }, () => {
            this.sendListToDB(this.state.user, [...this.state.lists])
        })
    }

    updateActiveTodoListId = (id) => {
        this.setState({
            activeToDoListId: id
        })
    }

    updateToDoList = (toDoList) => {
        this.setState(({ lists }) => {
            const idx = lists.findIndex(item => item.id === this.state.activeToDoListId);
            const before = lists.slice(0, idx);
            const after = lists.slice(idx + 1);
            const updateToDoList = { ...lists[idx], toDoList };
            return {
                lists: [...before, updateToDoList, ...after]
            }
        }, () => {
            this.sendListToDB(this.state.user, [...this.state.lists])
        })
    }

    createAccount = (email, password, resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.sendListToDB(response.user.uid, [...this.state.listsDefault], true);
                resolve(response);
            })
            .catch(error => reject(error));
    }

    signInAccount = (email, password, resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                resolve(response);
                let listsRef = firebase.database().ref(`users/${response.user.uid}/lists`);
                listsRef.get().then((snapshot) => {
                    const data = snapshot.val();
                    let updateData = [];
                    if (data) {
                        updateData = data.map(item => {
                            if (!('toDoList' in item)) {
                                return { ...item, toDoList: [] };
                            } else {
                                return item;
                            }
                        })
                    }
                    this.setState({
                        lists: updateData,
                        user: response.user.uid,
                        activeToDoListId: null
                    });
                }).catch((error) => {
                    console.error(error);
                });
            })
            .catch(error => reject(error));
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.setState({
                lists: this.state.listsDefault,
                activeToDoListId: null
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    sendListToDB = (uid, newLists, newUser) => {
        if (this.state.user || newUser) {
            firebase.database().ref(`users/${uid}`).set({
                lists: newLists
            });
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={Registration} />
                <Route path="/" exact render={() =>
                    <div>
                        <LogIn user={this.state.user} />

                        <div className="content">
                            <Lists lists={this.state.lists} />
                            {
                                this.state.activeToDoListId &&
                                <ToDoList activeToDoList={this.state.lists.find(item => item.id === this.state.activeToDoListId)} />
                            }
                        </div>
                    </div>
                } />
            </div>
        )
    }
}

export default App;
