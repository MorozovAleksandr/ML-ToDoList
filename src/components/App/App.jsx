import React from "react";
import Lists from "../Lists/Lists.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import dataJson from '../../data.json';
import { myEvents } from '../../events';
import "./App.css";

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.idList = 1;
        this.state = {
            activeToDoListId: null,
            lists: dataJson.lists.map(item => this.createTodoList(...item))
        }
    }

    componentDidMount() {
        myEvents.addListener("EaddTodoList", this.addTodoList);
        myEvents.addListener("EdeleteToDoList", this.deleteToDoList);
        myEvents.addListener("EupdateToDoListLabel", this.updateToDoListLabel);
        myEvents.addListener("EupdateActiveTodoListId", this.updateActiveTodoListId);
        myEvents.addListener("EupdateToDoList", this.updateToDoList);
    }

    componentWillUnmount() {
        myEvents.removeListener("EaddTodoList", this.addTodoList);
        myEvents.removeListener("EdeleteToDoList", this.deleteToDoList);
        myEvents.removeListener("EupdateToDoListLabel", this.updateToDoListLabel);
        myEvents.removeListener("EupdateActiveTodoListId", this.updateActiveTodoListId);
        myEvents.removeListener("EupdateToDoList", this.updateToDoList);
    }

    createTodoList = (label, list) => {
        return {
            id: this.idList++,
            label: label,
            toDoList: list
        }
    }

    addTodoList = (label) => {
        const newList = this.createTodoList(label, []);
        this.setState({
            lists: [...this.state.lists, newList]
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
        })
    }

    render() {
        console.log('Render app');
        return (
            <div className='wrapper'>
                <SignIn />
                <div className="content">
                    <Lists lists={this.state.lists} />
                    {
                        this.state.activeToDoListId &&
                        <ToDoList activeToDoList={this.state.lists.find(item => item.id === this.state.activeToDoListId)} />
                    }
                </div>
            </div>
        )
    }
}

export default App;
