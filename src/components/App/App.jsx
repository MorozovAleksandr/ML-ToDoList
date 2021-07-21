import React from "react";
import Lists from "../Lists/Lists.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import "./App.css"
import dataJson from '../../data.json';

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.idList = 1;
        this.state = {
            activeToDoListId: null,
            lists: dataJson.lists.map(item => this.createTodoList(...item))
        }
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
        console.log('render app');
        return (
            <div className='wrapper'>
                <SignIn />
                <div className="content">
                    <Lists cbAddTodoList={this.addTodoList} cbUpdateActiveTodoListId={this.updateActiveTodoListId} lists={this.state.lists} />
                    {
                        this.state.activeToDoListId &&
                        <ToDoList cbUpdateToDoList={this.updateToDoList} activeToDoList={this.state.lists.find(item => item.id === this.state.activeToDoListId)} />
                    }
                </div>
            </div>
        )
    }
}

export default App;
