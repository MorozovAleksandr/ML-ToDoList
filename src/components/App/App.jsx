import React, { useState } from "react";
import Lists from "../Lists/Lists.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import "./App.css"
import dataJson from '../../data.json';

function App() {
    let idList = 1;
    const createTodoList = (label, list) => {
        return {
            id: idList++,
            label: label,
            toDoList: list
        }
    }
    const [activeToDoListId, setActiveToDoListId] = useState(null);
    const [lists, setLists] = useState(dataJson.lists.map(item => createTodoList(...item)));

    const updateActiveTodoListId = (id) => {
        setActiveToDoListId(id);
    }

    const updateToDoList = (toDoList) => {
        const idx = lists.findIndex(item => item.id === activeToDoListId);
        const before = lists.slice(0, idx);
        const after = lists.slice(idx + 1);
        const updateToDoList = { ...lists[idx], toDoList };
        setLists([...before, updateToDoList, ...after]);
    }

    return (
        <div className='wrapper'>
            <SignIn />
            <div className="content">
                <Lists cbUpdateActiveTodoListId={updateActiveTodoListId} lists={lists} />
                {
                    activeToDoListId &&
                    <ToDoList cbUpdateToDoList={updateToDoList} activeToDoList={lists.find(item => item.id === activeToDoListId)} />
                }
            </div>
        </div>
    )
}

export default App;
