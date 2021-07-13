import React from "react";
import Lists from "../Lists/Lists.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import "./App.css"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            activeToDoListId: null,
            lists: [
                {
                    id: 1,
                    name: 'Магазин',
                    toDoList: null,
                },
                {
                    id: 2,
                    name: 'Мой день',
                    toDoList: null,
                },
                {
                    id: 3,
                    name: 'Тестовый лист',
                    toDoList: null,
                }
            ]
        }
    }

    updateActiveTodoListId = (id) => {
        this.setState(({ activeToDoListId }) => {
            return {
                activeToDoListId: id
            }
        })
    }

    render() {
        return (
            <div className='wrapper'>
                <SignIn />
                <Lists cbUpdateActiveTodoListId={this.updateActiveTodoListId} lists={this.state.lists} />
                {
                    this.state.activeToDoListId &&
                    <ToDoList activeToDoList={this.state.lists.find(item => item.id === this.state.activeToDoListId)} />
                }
            </div>
        )
    };
}

export default App;
