import React from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.toDoListTaskId = 0;
        this.state = {
            toDoList: this.props.activeToDoList.toDoList.map(item => this.createTodoItem(item.label))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeToDoList !== prevProps.activeToDoList) {
            this.setState(({ toDoList }) => {
                return {
                    toDoList: this.props.activeToDoList.toDoList.map(item => this.createTodoItem(item.label))
                }
            })
        }
    }

    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: this.toDoListTaskId++
        }
    }

    addItem = (item) => {
        const newtoDoList = [...this.state.toDoList, this.createTodoItem(item)];
        this.props.cbUpdateToDoList(newtoDoList);
    }

    render() {
        const elements = this.state.toDoList.map(item => {
            return (
                <ToDoListItem key={item.id} item={item} />
            )
        })
        return (
            <div className="todolist">
                <h1 className="todolist__name">
                    ToDo List {
                        this.props.activeToDoList.label
                    }
                </h1>
                <div className="todolist__list">
                    {elements}
                </div>
                <AddToDoItem cbAddItem={this.addItem} />
            </div>
        );
    }
}

export default ToDoList;