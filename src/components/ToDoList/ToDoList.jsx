import React from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";
import crypto from "crypto";
import EditToDoListItem from "./EditToDoListItem/EditToDoListItem";
import { myEvents } from '../../events';

class ToDoList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            toDoList: this.props.activeToDoList.toDoList,
            editToDoListItemId: null
        }
    }

    componentDidMount() {
        myEvents.addListener("EaddItem", this.addItem);
        myEvents.addListener("EupdateToDoListItem", this.updateToDoListItem);
        myEvents.addListener("EdeleteItem", this.deleteItem);
        myEvents.addListener("EtogglePropertyItem", this.togglePropertyItem);
        myEvents.addListener("EupdateEditToDoListItemId", this.updateEditToDoListItemId);
    }


    componentDidUpdate(prevProps) {
        if (this.props.activeToDoList !== prevProps.activeToDoList) {
            this.setState({
                toDoList: this.props.activeToDoList.toDoList
            })
        }
    }

    componentWillUnmount() {
        myEvents.removeListener("EaddItem", this.addItem);
        myEvents.removeListener("EupdateToDoListItem", this.updateToDoListItem);
        myEvents.removeListener("EdeleteItem", this.deleteItem);
        myEvents.removeListener("EtogglePropertyItem", this.togglePropertyItem);
        myEvents.removeListener("EupdateEditToDoListItemId", this.updateEditToDoListItemId);
    }

    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: crypto.randomBytes(3).toString("hex")
        }
    };

    addItem = (item) => {
        const newtoDoList = [...this.state.toDoList, this.createTodoItem(item)];
        myEvents.emit('EupdateToDoList', newtoDoList);
    }

    updateToDoListItem = (item, id) => {
        const idx = this.state.toDoList.findIndex(item => item.id === id);
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, item, ...after];
        myEvents.emit('EupdateToDoList', newtoDoList);
        this.setState({
            editToDoListItemId: null
        });
    }

    deleteItem = (id) => {
        const idx = this.state.toDoList.findIndex(item => item.id === id);
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, ...after];
        myEvents.emit('EupdateToDoList', newtoDoList);
    }

    togglePropertyItem = (id, property) => {
        const idx = this.state.toDoList.findIndex(el => el.id === id);
        const oldItem = this.state.toDoList[idx];
        const newItem = { ...oldItem, [property]: !oldItem[property] }
        const before = this.state.toDoList.slice(0, idx);
        const after = this.state.toDoList.slice(idx + 1);
        const newtoDoList = [...before, newItem, ...after];
        myEvents.emit('EupdateToDoList', newtoDoList);
    }

    updateEditToDoListItemId = (id) => {
        this.setState({
            editToDoListItemId: id
        });
    }

    render() {
        const doneCount = this.state.toDoList.filter(el => el.done).length;
        const toDoCount = this.state.toDoList.length - doneCount;
        const elements = this.state.toDoList.map(item => <ToDoListItem key={item.id} item={item} />);
        return (
            <div className="todolist">
                <h1 className="todolist__name">
                    {this.props.activeToDoList.label}
                </h1>
                {
                    this.state.toDoList.length > 0 &&
                    <div className="todolist__counts">
                        <div className="todolist__counts__item">Осталось <span className="todolist__counts__item_count">{toDoCount}</span></div>
                        <div className="todolist__counts__item">Выполнено <span className="todolist__counts__item_count">{doneCount}</span></div>
                    </div>
                }
                <div className="todolist__list">
                    {elements}
                </div>
                <AddToDoItem />
                {
                    this.state.editToDoListItemId &&
                    <EditToDoListItem activeToDoList={this.props.activeToDoList.label} editToDoListItem={this.state.toDoList.find(item => item.id === this.state.editToDoListItemId)} />
                }
            </div>
        )
    }
}

export default ToDoList;
