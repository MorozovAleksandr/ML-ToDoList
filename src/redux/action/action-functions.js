import {
    updateActiveTodoListIdAC,
    addToDoListAC,
    updateToDoListLabelAC,
    updateListsAC,
    deleteToDoListAC
} from './action';
import crypto from "crypto";

const getBeforeAfterIdx = (items, id) => {
    const idx = items.findIndex(item => item.id === id);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [idx, b, a];
}


/* work with ToDoList */
const createTodoList = (label, list) => {
    return {
        id: crypto.randomBytes(3).toString("hex"),
        label: label,
        toDoList: list
    }
}

const updateActiveTodoListId = (todoListService, dispatch, uid, id) => {
    todoListService.sendActiveToDoListIdToDB(uid, id);
    dispatch(updateActiveTodoListIdAC(id));
}

const addToDoList = (todoListService, label, user, lists, dispatch) => {
    if (lists.length >= 19) {
        return null;
    }
    const newList = createTodoList(label, []);
    const updateLists = [...lists, newList];
    todoListService.sendListToDB(user, updateLists);
    dispatch(addToDoListAC(newList));
}

const updateToDoListLabel = (todoListService, id, label, user, lists, dispatch) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, id);
    const updateToDoList = { ...lists[idxList], label: label };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    todoListService.sendListToDB(user, updateLists);
    dispatch(updateToDoListLabelAC(updateLists));
}

const deleteToDoList = (todoListService, id, lists, user, activeToDoListId, dispatch) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, id);
    const updateLists = [...beforeList, ...afterList];
    if (id === activeToDoListId) {
        todoListService.sendActiveToDoListIdToDB(user, null);
        dispatch(deleteToDoListAC(updateLists));
    } else {
        dispatch(updateListsAC(updateLists));
    }
    todoListService.sendListToDB(user, updateLists);
}

const updateToDoList = (todoListService, activeToDoListId, user, lists, toDoList, dispatch) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, activeToDoListId);
    const updateToDoList = { ...lists[idxList], toDoList };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    dispatch(updateListsAC(updateLists));
    todoListService.sendListToDB(user, updateLists);
}
/* end work with ToDoList */


/* work with task */
const updateToDoListItemTimeOrDate = (todoListService, activeToDoListId, taskId, user, lists, dispatch, date = null, time = null) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(lists[idxList].toDoList, taskId);

    let updateTask = { ...lists[idxList].toDoList[idxTask], date: date, time: time };

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idxList], toDoList: updateToDoListItem };
    const newLists = [...beforeList, updateToDoList, ...afterList];
    dispatch(updateListsAC(newLists));
    todoListService.sendListToDB(user, newLists);
}
/* end with task */


/* work with subTask */
const addSubTask = (todoListService, newSubTask, user, lists, activeToDoListId, taskId, dispatch) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(lists[idxList].toDoList, taskId);

    if (lists[idxList].toDoList[idxTask].subtask && [...lists[idxList].toDoList[idxTask].subtask].length >= 10) { // ПРОВЕРИТЬ НУЖНА ЛИ ДИСТРУКТУРИЗАЦИЯ
        return;
    }

    let task;
    if (lists[idxList].toDoList[idxTask].subtask) {
        task = {
            ...lists[idxList].toDoList[idxTask],
            subtask: [
                ...lists[idxList].toDoList[idxTask].subtask,
                {
                    ...newSubTask
                }
            ]
        }
    } else {
        task = {
            ...lists[idxList].toDoList[idxTask],
            subtask: [
                {
                    ...newSubTask
                }
            ]
        }
    }
    const updateToDoListItem = [...beforeTask, task, ...afterTask];
    const updateToDoList = { ...lists[idxList], toDoList: updateToDoListItem };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    dispatch(updateListsAC(updateLists));
    todoListService.sendListToDB(user, updateLists);
}

const updateSubTaskTimeOrDate = (todoListService, id, taskId, listId, user, lists, dispatch, date = null, time = null) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, listId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(lists[idxList].toDoList, taskId);
    const [idxSubTask, beforeSubTask, afterSubTask] = getBeforeAfterIdx(lists[idxList].toDoList[idxTask].subtask, id);

    const oldSubTask = lists[idxList].toDoList[idxTask].subtask[idxSubTask]; // старая подзадача

    let newSubTask = { ...oldSubTask, date: date, time: time };
    const updateTask = {
        ...lists[idxList].toDoList[idxTask],
        subtask: [
            ...beforeSubTask,
            {
                ...newSubTask
            },
            ...afterSubTask
        ]
    };

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idxList], toDoList: updateToDoListItem };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    dispatch(updateListsAC(updateLists));
    todoListService.sendListToDB(user, updateLists);
}

const workWithSubTask = (todoListService, id, taskId, listId, user, lists, dispatch, property = null, label = null) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, listId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(lists[idxList].toDoList, taskId);
    const [idxSubTask, beforeSubTask, afterSubTask] = getBeforeAfterIdx(lists[idxList].toDoList[idxTask].subtask, id);

    const oldSubTask = lists[idxList].toDoList[idxTask].subtask[idxSubTask]; // старая подзадача
    let newSubTask; // новая подзадача, обновили свойство
    let updateTask;
    if (property) { // если нужно заменить свойство подзадачи
        newSubTask = { ...oldSubTask, [property]: !oldSubTask[property] }; // новая подзадача, обновили свойство
        updateTask = {
            ...lists[idxList].toDoList[idxTask],
            subtask: [
                ...beforeSubTask,
                {
                    ...newSubTask
                },
                ...afterSubTask
            ]
        };
    }

    if (label) { // если нужно изменить label подзадачи
        newSubTask = { ...oldSubTask, label: label }; // новая подзадача, обновили label
        updateTask = {
            ...lists[idxList].toDoList[idxTask],
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
            ...lists[idxList].toDoList[idxTask],
            subtask: [
                ...beforeSubTask,
                ...afterSubTask
            ]
        };
    }

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...lists[idxList], toDoList: updateToDoListItem };
    const newLists = [...beforeList, updateToDoList, ...afterList];
    dispatch(updateListsAC(newLists));
    todoListService.sendListToDB(user, newLists);
}
/* end work with subTask */

export {
    updateActiveTodoListId,
    addToDoList,
    updateToDoListLabel,
    updateToDoListItemTimeOrDate,
    addSubTask,
    updateSubTaskTimeOrDate,
    workWithSubTask,
    deleteToDoList,
    updateToDoList
}