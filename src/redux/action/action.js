import crypto from "crypto";

const updateUser = (id = false) => {
    return {
        type: "UPDATE_USER",
        payload: id
    }
}

const updateLoading = (status) => {
    return {
        type: "UPDATE_LOADING",
        payload: status
    }
}


const updateActiveTodoListId = (todoListService, dispatch, uid, id) => {
    todoListService.sendActiveToDoListIdToDB(uid, id);
    dispatch(updateActiveTodoListIdAC(id));
}

const updateActiveTodoListIdAC = (id) => {
    return {
        type: "UPDATE_ACTIVE_TODO_LIST_ID",
        payload: id
    }
}


const createTodoList = (label, list) => {
    return {
        id: crypto.randomBytes(3).toString("hex"),
        label: label,
        toDoList: list
    }
}
const addToDoList = (todoListService, label, user, lists, dispatch) => {
    const newList = createTodoList(label, []);
    const newLists = [...lists, newList];
    todoListService.sendListToDB(user, newLists);
    dispatch(addToDoListAC(newList));
}
const addToDoListAC = (list) => {
    return {
        type: "ADD_TODO_LIST",
        payload: list
    }
}

const updateToDoListLabel = (todoListService, id, label, user, lists, dispatch) => {
    const idx = lists.findIndex(item => item.id === id);
    const before = lists.slice(0, idx);
    const after = lists.slice(idx + 1);
    const updateToDoList = { ...lists[idx], label: label };
    const newLists = [...before, updateToDoList, ...after];
    todoListService.sendListToDB(user, newLists);
    dispatch(updateToDoListLabelAC(newLists));
}
const updateToDoListLabelAC = (newLists) => {
    return {
        type: "UPDATE_TODO_LIST_LABEL",
        payload: newLists
    }
}

const updateToDoListItemTimeOrDate = (todoListService, activeToDoListId, taskId, user, lists, dispatch, date = null, time = null) => {
    const idx = lists.findIndex(item => item.id === activeToDoListId); // Индекс списка
    const before = lists.slice(0, idx); // До индекса
    const after = lists.slice(idx + 1); // После индекса

    const idxTask = lists[idx].toDoList.findIndex(item => item.id === taskId); // Индекс таски
    const beforeTask = lists[idx].toDoList.slice(0, idxTask); // До таски
    const afterTask = lists[idx].toDoList.slice(idxTask + 1); // После таски

    let updateTask = { ...lists[idx].toDoList[idxTask], date: date, time: time };

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idx], toDoList: updateToDoListItem };
    const newLists = [...before, updateToDoList, ...after];
    dispatch(updateLists(newLists));
    todoListService.sendListToDB(user, newLists);
}



const addSubTask = (todoListService, subtask, user, lists, activeToDoListId, taskId, dispatch) => {
    const idx = lists.findIndex(item => item.id === activeToDoListId);
    const before = lists.slice(0, idx);
    const after = lists.slice(idx + 1);
    const idxTask = lists[idx].toDoList.findIndex(item => item.id === taskId);
    const beforeTask = lists[idx].toDoList.slice(0, idxTask);
    const afterTask = lists[idx].toDoList.slice(idxTask + 1);

    if (lists[idx].toDoList[idxTask].subtask && [...lists[idx].toDoList[idxTask].subtask].length >= 10) {
        return;
    }

    let task;
    if (lists[idx].toDoList[idxTask].subtask) {
        task = {
            ...lists[idx].toDoList[idxTask],
            subtask: [
                ...lists[idx].toDoList[idxTask].subtask,
                {
                    ...subtask
                }
            ]
        }
    } else {
        task = {
            ...lists[idx].toDoList[idxTask],
            subtask: [
                {
                    ...subtask
                }
            ]
        }
    }
    const updateToDoListItem = [...beforeTask, task, ...afterTask];
    const updateToDoList = { ...lists[idx], toDoList: updateToDoListItem };
    const newLists = [...before, updateToDoList, ...after];
    dispatch(updateLists(newLists));
    todoListService.sendListToDB(user, newLists);
}

const updateSubTaskTimeOrDate = (todoListService, id, taskId, listId, user, lists, dispatch, date = null, time = null) => {
    const idx = lists.findIndex(item => item.id === listId); // индекс списка
    const before = lists.slice(0, idx); // до списка
    const after = lists.slice(idx + 1); // после списка

    const idxTask = lists[idx].toDoList.findIndex(item => item.id === taskId); // Индекс таски
    const beforeTask = lists[idx].toDoList.slice(0, idxTask); // До таски
    const afterTask = lists[idx].toDoList.slice(idxTask + 1); // После таски

    const idxSubTask = lists[idx].toDoList[idxTask].subtask.findIndex(item => item.id === id); // индекс подзадачи
    const beforeSubTask = lists[idx].toDoList[idxTask].subtask.slice(0, idxSubTask); // до подзадачи
    const afterSubTask = lists[idx].toDoList[idxTask].subtask.slice(idxSubTask + 1); // после подзадачи
    const oldSubTask = lists[idx].toDoList[idxTask].subtask[idxSubTask]; // старая подзадача

    let newSubTask = { ...oldSubTask, date: date, time: time };
    const updateTask = {
        ...lists[idx].toDoList[idxTask],
        subtask: [
            ...beforeSubTask,
            {
                ...newSubTask
            },
            ...afterSubTask
        ]
    };

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idx], toDoList: updateToDoListItem };
    const newLists = [...before, updateToDoList, ...after];
    dispatch(updateLists(newLists));
    todoListService.sendListToDB(user, newLists);
}

const workWithSubTask = (todoListService, id, taskId, listId, user, lists, dispatch, property = null, label = null) => {
    const idx = lists.findIndex(item => item.id === listId); // id списка
    const before = lists.slice(0, idx); // до списка
    const after = lists.slice(idx + 1); // после списка

    const idxTask = lists[idx].toDoList.findIndex(item => item.id === taskId); // id задачи
    const beforeTask = lists[idx].toDoList.slice(0, idxTask); // до задачи
    const afterTask = lists[idx].toDoList.slice(idxTask + 1); // после задачи

    const idxSubTask = lists[idx].toDoList[idxTask].subtask.findIndex(item => item.id === id); // id подзадачи
    const beforeSubTask = lists[idx].toDoList[idxTask].subtask.slice(0, idxSubTask); // до подзадачи
    const afterSubTask = lists[idx].toDoList[idxTask].subtask.slice(idxSubTask + 1); // после подзадачи
    const oldSubTask = lists[idx].toDoList[idxTask].subtask[idxSubTask]; // старая подзадача
    let newSubTask; // новая подзадача, обновили свойство
    let updateTask;
    if (property) { // если нужно заменить свойство
        newSubTask = { ...oldSubTask, [property]: !oldSubTask[property] }; // новая подзадача, обновили свойство
        updateTask = {
            ...lists[idx].toDoList[idxTask],
            subtask: [
                ...beforeSubTask,
                {
                    ...newSubTask
                },
                ...afterSubTask
            ]
        };
    }

    if (label) { // если нужно изменить задачу
        newSubTask = { ...oldSubTask, label: label }; // новая подзадача, обновили свойство
        updateTask = {
            ...lists[idx].toDoList[idxTask],
            subtask: [
                ...beforeSubTask,
                {
                    ...newSubTask
                },
                ...afterSubTask
            ]
        };
    }

    if (!label && !property) { // если нужно удалить подзадачу
        updateTask = {
            ...lists[idx].toDoList[idxTask],
            subtask: [
                ...beforeSubTask,
                ...afterSubTask
            ]
        };
    }

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idx], toDoList: updateToDoListItem };
    const newLists = [...before, updateToDoList, ...after];
    dispatch(updateLists(newLists));
    todoListService.sendListToDB(user, newLists);
}

const deleteToDoList = (todoListService, id, lists, user, activeToDoListId, dispatch) => {
    const idx = lists.findIndex(item => item.id === id);
    const before = lists.slice(0, idx);
    const after = lists.slice(idx + 1);
    const newLists = [...before, ...after];
    if (id === activeToDoListId) {
        todoListService.sendActiveToDoListIdToDB(user, null);
        dispatch(deleteToDoListAC(newLists));
    } else {
        dispatch(updateLists(newLists));
    }
    todoListService.sendListToDB(user, newLists);
}


const updateToDoList = (todoListService, activeToDoListId, user, lists, toDoList, dispatch) => {
    const idx = lists.findIndex(item => item.id === activeToDoListId);
    const before = lists.slice(0, idx);
    const after = lists.slice(idx + 1);
    const updateToDoList = { ...lists[idx], toDoList };
    const newLists = [...before, updateToDoList, ...after];
    dispatch(updateLists(newLists));
    todoListService.sendListToDB(user, newLists);
}

const updateLists = (lists) => {
    return {
        type: "UPDATE_LISTS",
        payload: lists
    }
}

const authenticationUser = (userId, lists, activeToDoListId, loading) => {
    return {
        type: "AUTHENTICATION_USER",
        userId,
        lists,
        activeToDoListId,
        loading
    }
}

const signOutAccount = (lists) => {
    return {
        type: "SIGN_OUT_ACCOUNT",
        lists
    }
}

const signInAccount = (userId, lists) => {
    return {
        type: "SIGN_IN_ACCOUNT",
        userId,
        lists
    }
}

const deleteToDoListAC = (lists) => {
    return {
        type: "DELETE_TODOLIST",
        lists
    }
}


export {
    updateUser,
    updateLoading,
    updateActiveTodoListId,
    updateActiveTodoListIdAC,
    updateLists,
    authenticationUser,
    signOutAccount,
    signInAccount,
    deleteToDoList,
    addToDoList,
    updateToDoListLabel,
    updateToDoList,
    addSubTask,
    workWithSubTask,
    updateToDoListItemTimeOrDate,
    updateSubTaskTimeOrDate
}