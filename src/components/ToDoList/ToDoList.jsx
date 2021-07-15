import React, { useEffect, useState } from "react";
import './ToDoList.css'
import ToDoListItem from "./ToDoListItem/ToDoListItem.jsx";
import AddToDoItem from "./AddToDoItem/AddToDoItem.jsx";
import crypto from "crypto";

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

    useEffect(() => {
        setToDoList([...props.activeToDoList.toDoList]);
    }, [props.activeToDoList]);

    const addItem = (item) => {
        const newtoDoList = [...toDoList, createTodoItem(item)];
        props.cbUpdateToDoList(newtoDoList);
    }

    const deleteItem = (id) => {
        const idx = toDoList.findIndex(item => item.id === id);
        const before = toDoList.slice(0, idx);
        const after = toDoList.slice(idx + 1);
        const newtoDoList = [...before, ...after];
        props.cbUpdateToDoList(newtoDoList);
    }
    const elements = toDoList.map(item => <ToDoListItem cbDeleteItem={deleteItem} key={item.id} item={item} />);

    return (
        <div className="todolist">
            <h1 className="todolist__name">
                {props.activeToDoList.label}
            </h1>
            <div className="todolist__list">
                {elements}
            </div>
            <AddToDoItem cbAddItem={addItem} />
        </div>
    )
}

export default ToDoList;
