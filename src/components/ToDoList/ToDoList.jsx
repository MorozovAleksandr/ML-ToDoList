import React, { useEffect, useState } from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";
import crypto from "crypto";
import EditToDoListItem from "./EditToDoListItem/EditToDoListItem";

function ToDoList(props) {
    const createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: crypto.randomBytes(2).toString("hex")
        }
    };

    const [toDoList, setToDoList] = useState([...props.activeToDoList.toDoList]);

    const [editToDoListItemId, setEditToDoListItemId] = useState(null);

    useEffect(() => {
        setToDoList([...props.activeToDoList.toDoList]);
    }, [props.activeToDoList]);

    const addItem = (item) => {
        const newtoDoList = [...toDoList, createTodoItem(item)];
        props.cbUpdateToDoList(newtoDoList);
    }

    const updateToDoListItem = (item, id) => {
        const idx = toDoList.findIndex(item => item.id === id);
        const before = toDoList.slice(0, idx);
        const after = toDoList.slice(idx + 1);
        const newtoDoList = [...before, item, ...after];
        props.cbUpdateToDoList(newtoDoList);
        setEditToDoListItemId(null);
    }

    const deleteItem = (id) => {
        const idx = toDoList.findIndex(item => item.id === id);
        const before = toDoList.slice(0, idx);
        const after = toDoList.slice(idx + 1);
        const newtoDoList = [...before, ...after];
        props.cbUpdateToDoList(newtoDoList);
    }

    const updateEditToDoListItemId = (id) => {
        setEditToDoListItemId(id);
    }

    const elements = toDoList.map(item => <ToDoListItem cbUpdateEditToDoListItemId={updateEditToDoListItemId} cbDeleteItem={deleteItem} key={item.id} item={item} />);

    return (
        <div className="todolist">
            <h1 className="todolist__name">
                {props.activeToDoList.label}
            </h1>
            <div className="todolist__list">
                {elements}
            </div>
            <AddToDoItem cbAddItem={addItem} />
            {
                editToDoListItemId &&
                <EditToDoListItem cbUpdateEditToDoListItemId={updateEditToDoListItemId} cbUpdateToDoListItem={updateToDoListItem} activeToDoList={props.activeToDoList.label} editToDoListItem={toDoList.find(item => item.id === editToDoListItemId)} />
            }

        </div>
    )
}

export default ToDoList;
