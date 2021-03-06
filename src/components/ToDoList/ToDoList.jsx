import React from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";
import { updatingEditedTaskAC } from "../../redux/action/action";
import { myEvents } from '../../events';
import { connect } from "react-redux";
import EditForm from "../EditForm/EditForm";
import ToDoListFilters from "./ToDoListFilters/ToDoListFilters";

class ToDoList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            toDoList: this.props.activeToDoList.toDoList,
            editToDoListItemId: null
        }
    }

    componentDidMount() {
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
        myEvents.removeListener("EupdateEditToDoListItemId", this.updateEditToDoListItemId);
    }

    onSaveEditListItem = (label) => {
        this.props.updatingEditedTaskAC(this.state.editToDoListItemId, label);
        this.setState({
            editToDoListItemId: null
        });
    }

    onCloseEditListItem = () => {
        this.updateEditToDoListItemId(null);
    }

    updateEditToDoListItemId = (id) => {
        this.setState({
            editToDoListItemId: id
        });
    }

    getElemetnsAfterFilters = () => {
        let includedFilters = [];
        let initialElements = [...this.state.toDoList];
        let finalElements = [];
        this.props.filters.forEach(item => {
            if (item.status) {
                includedFilters.push(item);
            }
        })
        if (includedFilters.length) {
            includedFilters.forEach(filter => {
                initialElements.forEach((task) => {
                    if (filter.filter === "done" && task.done) {
                        finalElements.push(task);
                    }

                    if (filter.filter === "toDone" && !task.done) {
                        finalElements.push(task);
                    }

                    if (filter.filter === "important" && task.important) {
                        finalElements.push(task);
                    }

                    if (filter.filter === "notImportant" && !task.important) {
                        finalElements.push(task);
                    }
                })
            })
            const uniqueSet = new Set(finalElements);
            const uniqueFinalElements = [...uniqueSet];
            return uniqueFinalElements.map(item => <ToDoListItem key={item.id} item={item} />);
        } else {
            return this.state.toDoList.map(item => <ToDoListItem key={item.id} item={item} />);
        }

    }

    render() {
        const doneCount = this.state.toDoList.filter(el => el.done).length;
        const toDoCount = this.state.toDoList.length - doneCount;
        const elements = this.getElemetnsAfterFilters();
        const editToDoListItem = this.state.toDoList.find(item => item.id === this.state.editToDoListItemId);
        return (
            <div className="todolist">
                <h1 className="todolist__name">
                    {this.props.activeToDoList.label}
                </h1>
                {
                    this.state.toDoList.length > 0 &&
                    <div className="todolist__counts">
                        <div className="todolist__counts__item">{`${toDoCount === 1 ? `????????????????` : `????????????????`}`} <span className="todolist__counts__item_count">{toDoCount}</span> {(toDoCount === 1 || toDoCount === 21 || toDoCount === 31 || toDoCount === 41) ? `????????????` : ((toDoCount > 1 && toDoCount < 5) || (toDoCount > 21 && toDoCount < 25) || (toDoCount > 31 && toDoCount < 35)) ? `????????????` : `??????????`}</div>
                        <div className="todolist__counts__item">?????????????????? <span className="todolist__counts__item_count">{doneCount}</span> {(doneCount === 1 || doneCount === 21 || doneCount === 31 || doneCount === 41) ? `????????????` : ((doneCount > 1 && doneCount < 5) || (doneCount > 21 && doneCount < 25) || (doneCount > 31 && doneCount < 35)) ? `????????????` : `??????????`}</div>
                    </div>
                }
                <ToDoListFilters />
                <AddToDoItem />
                <div className="todolist__list">
                    {elements}
                </div>
                {
                    this.state.editToDoListItemId &&
                    <EditForm initialLabel={editToDoListItem.label} title={this.props.activeToDoList.label} text="????????????" eventSave={this.onSaveEditListItem} eventClose={this.onCloseEditListItem} />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ filters }) => {
    return {
        filters
    }
}

const mapDispatchToProps = {
    updatingEditedTaskAC
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
