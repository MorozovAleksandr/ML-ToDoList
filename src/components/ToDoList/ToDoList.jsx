import React from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";
import crypto from "crypto";
import EditToDoListItem from "./EditToDoListItem/EditToDoListItem";

class ToDoList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            toDoList: this.props.activeToDoList.toDoList,
            editToDoListItemId: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeToDoList !== prevProps.activeToDoList) {
            this.setState({
                toDoList: this.props.activeToDoList.toDoList
            })
        }
    }

    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: crypto.randomBytes(2).toString("hex")
        }
    };

    addItem = (item) => {
        const newtoDoList = [...this.state.toDoList, this.createTodoItem(item)];
        this.props.cbUpdateToDoList(newtoDoList);
    }

    updateToDoListItem = (item, id) => {
        const idx = this.state.toDoList.findIndex(item => item.id === id);
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, item, ...after];
        this.props.cbUpdateToDoList(newtoDoList);
        this.setState({
            editToDoListItemId: null
        });
    }

    deleteItem = (id) => {
        const idx = this.state.toDoList.findIndex(item => item.id === id);
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, ...after];
        this.props.cbUpdateToDoList(newtoDoList);
    }

    togglePropertyItem = (id, property) => {
        const idx = this.state.toDoList.findIndex(el => el.id === id);
        const oldItem = this.state.toDoList[idx];
        const newItem = { ...oldItem, [property]: !oldItem[property] }
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, newItem, ...after];
        this.props.cbUpdateToDoList(newtoDoList);
    }

    updateEditToDoListItemId = (id) => {
        this.setState({
            editToDoListItemId: id
        });
    }



    render() {
        console.log('render ToDoList');
        const elements = this.state.toDoList.map(item => <ToDoListItem cbTogglePropertyItem={this.togglePropertyItem} cbUpdateEditToDoListItemId={this.updateEditToDoListItemId} cbDeleteItem={this.deleteItem} key={item.id} item={item} />);
        return (
            <div className="todolist">
                <h1 className="todolist__name">
                    {this.props.activeToDoList.label}
                </h1>
                <div className="todolist__list">
                    {elements}
                </div>
                <AddToDoItem cbAddItem={this.addItem} />
                {
                    this.state.editToDoListItemId &&
                    <EditToDoListItem cbUpdateEditToDoListItemId={this.updateEditToDoListItemId} cbUpdateToDoListItem={this.updateToDoListItem} activeToDoList={this.props.activeToDoList.label} editToDoListItem={this.state.toDoList.find(item => item.id === this.state.editToDoListItemId)} />
                }
            </div>
        )
    }
}

export default ToDoList;
