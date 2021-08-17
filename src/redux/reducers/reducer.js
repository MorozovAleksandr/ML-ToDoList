
import crypto from "crypto";

const initialState = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: [],
    recycleBin: {
        lists: [],
        tasks: [],
        subtasks: []
    },
    notifacation: {
        status: false,
        text: '',
        color: ''
    }
}

const getBeforeAfterIdx = (items, id) => {
    const idx = items.findIndex(item => item.id === id);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [idx, b, a];
}

const getBeforeAfter = (items, id) => {
    const idx = items.findIndex(item => item.id === id);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [b, a];
}

const createTask = (label) => {
    return {
        label: label,
        important: false,
        done: false,
        subtask: null,
        date: null,
        time: null,
        id: crypto.randomBytes(3).toString("hex")
    }
};

const createSubTask = (label, taskId, listId) => {
    return {
        label: label,
        important: false,
        done: false,
        taskId: taskId,
        listId: listId,
        date: null,
        time: null,
        id: crypto.randomBytes(3).toString("hex")
    }
};

const addToDoList = (lists, list) => {
    if (lists.length >= 20) {
        return lists;
    } else {
        return [...lists, list];
    }
}

const updateToDoListLabel = (lists, id, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, id);
    const updateToDoList = { ...lists[idxList], label: label };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    return updateLists;
}

const deleteToDoList = (lists, id, recycleBin) => {

    if (recycleBin.lists.length + recycleBin.tasks.length + recycleBin.subtasks.length >= 30) {
        return lists;
    }

    const [beforeList, afterList] = getBeforeAfter(lists, id);
    const updateLists = [...beforeList, ...afterList];
    return updateLists;
}

const updateActiveListBeforeDelete = (activeToDoListId, id) => {
    return activeToDoListId === id ? null : activeToDoListId;
}

const addTask = (state, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);

    if (state.lists[idxList].toDoList.length >= 40) {
        return state.lists;
    }

    const updateToDoList = [...state.lists[idxList].toDoList, createTask(label)];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
}

const deleteTask = (state, id) => {
    if (state.recycleBin.lists.length + state.recycleBin.tasks.length + state.recycleBin.subtasks.length >= 30) {
        return state.lists;
    }

    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [beforeTask, afterTask] = getBeforeAfter(state.lists[idxList].toDoList, id);
    const updateToDoList = [...beforeTask, ...afterTask];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
}

const togglePropertyTask = (state, id, property) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, id);
    const oldTask = state.lists[idxList].toDoList[idxTask];
    const updateTask = { ...oldTask, [property]: !oldTask[property] };
    const updateToDoList = [...beforeTask, updateTask, ...afterTask];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
}

const updatingEditedTask = (state, id, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, id);
    const oldTask = state.lists[idxList].toDoList[idxTask];
    const updateTask = { ...oldTask, label };
    const updateToDoList = [...beforeTask, updateTask, ...afterTask];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
}

const updateDateOrTimeTask = (state, id, date, time) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, id);
    const oldTask = state.lists[idxList].toDoList[idxTask];
    const updateTask = { ...oldTask, date, time };
    const updateToDoList = [...beforeTask, updateTask, ...afterTask];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
}

const addSubTask = (state, taskId, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, taskId);

    if (state.lists[idxList].toDoList[idxTask].subtask && state.lists[idxList].toDoList[idxTask].subtask.length >= 10) {
        return state.lists;
    }
    let task;
    const newSubTask = createSubTask(label, taskId, state.activeToDoListId);
    if (state.lists[idxList].toDoList[idxTask].subtask) {
        task = {
            ...state.lists[idxList].toDoList[idxTask],
            subtask: [
                ...state.lists[idxList].toDoList[idxTask].subtask,
                {
                    ...newSubTask
                }
            ]
        }
    } else {
        task = {
            ...state.lists[idxList].toDoList[idxTask],
            subtask: [
                {
                    ...newSubTask
                }
            ]
        }
    }
    const updateToDoListItem = [...beforeTask, task, ...afterTask];
    const updateToDoList = { ...state.lists[idxList], toDoList: updateToDoListItem };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    return updateLists;
}

const updateDateOrTimeSubTask = (state, id, taskId, date, time) => {
    console.log('updateDateOrTimeSubTaskAC');
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, taskId);
    const [idxSubTask, beforeSubTask, afterSubTask] = getBeforeAfterIdx(state.lists[idxList].toDoList[idxTask].subtask, id);

    const oldSubTask = state.lists[idxList].toDoList[idxTask].subtask[idxSubTask]; // старая подзадача

    let newSubTask = { ...oldSubTask, date, time };
    const updateTask = {
        ...state.lists[idxList].toDoList[idxTask],
        subtask: [
            ...beforeSubTask,
            {
                ...newSubTask
            },
            ...afterSubTask
        ]
    };

    const updateToDoListItem = [...beforeTask, updateTask, ...afterTask];
    const updateToDoList = { ...state.lists[idxList], toDoList: updateToDoListItem };
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    return updateLists;
}

const workWithSubTask = ({ lists, activeToDoListId, recycleBin }, id, taskId, property, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, activeToDoListId);
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
        if (recycleBin.lists.length + recycleBin.tasks.length + recycleBin.subtasks.length >= 30) {
            return lists;
        }
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
    const updateLists = [...beforeList, updateToDoList, ...afterList];
    return updateLists;
}

const addItemToRecycleBin = (state, id, type, taskId = null, property, label) => {

    if (state.recycleBin.lists.length + state.recycleBin.tasks.length + state.recycleBin.subtasks.length >= 30) {
        return state.recycleBin;
    }

    if (type === "list") {
        const [idxList] = getBeforeAfterIdx(state.lists, id);
        const item = { ...state.lists[idxList] };
        const tasks = [...state.recycleBin.tasks];
        let subtasks = [...state.recycleBin.subtasks];
        let updateTasks = [];
        let updateTasksForList = [];

        // Проверяем задачи из корзины, для переноса в лист
        if (tasks.length) {
            tasks.forEach((task) => {
                if (task.listId === id) {
                    updateTasksForList = [...updateTasksForList, task];
                }
                else {
                    updateTasks = [...updateTasks, task];
                }
            })
        }

        let updateItem = { ...item, toDoList: [...item.toDoList, ...updateTasksForList] };

        // Проверяем подзадачи из корзины, для переноса в лист
        if (subtasks.length) {
            const searchSubtasks = subtasks.filter(subtask => subtask.listId === id);
            updateItem.toDoList.forEach(task => {
                searchSubtasks.forEach(subtask => {
                    if (task.id === subtask.taskId) {
                        //После нахождения нужной таски, добавляем в неё удалённые подзадачи
                        const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(updateItem.toDoList, task.id);
                        const updateTask = { ...updateItem.toDoList[idxTask], subtask: [...updateItem.toDoList[idxTask].subtask, subtask] };
                        updateItem = { ...updateItem, toDoList: [...beforeTask, updateTask, ...afterTask] };

                        //Обновляем список подзадач в корзине
                        const idxSubtask = subtasks.findIndex(item => item.taskId === task.id);
                        const beforeSubtask = subtasks.slice(0, idxSubtask);
                        const afterSubtask = subtasks.slice(idxSubtask + 1);
                        subtasks = [...beforeSubtask, ...afterSubtask];
                    }
                })
            })
        }

        return { ...state.recycleBin, lists: [...state.recycleBin.lists, updateItem], tasks: updateTasks, subtasks: subtasks };
    }

    if (type === "task") {
        const [idxList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
        const [idxTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, id);

        const subtasks = [...state.recycleBin.subtasks];
        let updateSubtasks = [];
        let updateSubtasksForTask = [];

        if (subtasks) {
            subtasks.forEach((subtask) => {
                if (subtask.taskId === id) {
                    updateSubtasksForTask = [...updateSubtasksForTask, subtask]
                } else {
                    updateSubtasks = [...updateSubtasks, subtask];
                }
            })
        }
        const item = { ...state.lists[idxList].toDoList[idxTask], listId: state.lists[idxList].id };
        const updateSub = item.subtask ? item.subtask : [];
        return { ...state.recycleBin, tasks: [...state.recycleBin.tasks, { ...item, subtask: [...updateSub, ...updateSubtasksForTask] }], subtasks: updateSubtasks };
    }

    if (type === "subtask" && (!label && !property)) {
        const [idxList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
        const [idxTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, taskId);
        const [idxSubTask] = getBeforeAfterIdx(state.lists[idxList].toDoList[idxTask].subtask, id);
        const item = { ...state.lists[idxList].toDoList[idxTask].subtask[idxSubTask] };

        return { ...state.recycleBin, subtasks: [...state.recycleBin.subtasks, item] };
    }
    return state.recycleBin;
}

const restoreItem = (lists, item, type) => {
    if (type === "lists") {
        return [...lists, item];
    }

    if (type === "tasks") {
        const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, item.listId);
        const updateToDoList = [...lists[idxList].toDoList, item];
        const updateList = { ...lists[idxList], toDoList: updateToDoList };
        const updateLists = [...beforeList, updateList, ...afterList];
        return updateLists;
    }

    if (type === "subtasks") {
        const [idxList, beforeList, afterList] = getBeforeAfterIdx(lists, item.listId);
        const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(lists[idxList].toDoList, item.taskId);

        let task;
        if (lists[idxList].toDoList[idxTask].subtask) {
            task = {
                ...lists[idxList].toDoList[idxTask],
                subtask: [
                    ...lists[idxList].toDoList[idxTask].subtask,
                    {
                        ...item
                    }
                ]
            }
        } else {
            task = {
                ...lists[idxList].toDoList[idxTask],
                subtask: [
                    {
                        ...item
                    }
                ]
            }
        }
        const updateToDoListItem = [...beforeTask, task, ...afterTask];
        const updateToDoList = { ...lists[idxList], toDoList: updateToDoListItem };
        const updateLists = [...beforeList, updateToDoList, ...afterList];
        return updateLists;
    }
}

const removeItemRecycleBin = (recycleBin, item, type) => {
    const [beforeList, afterList] = getBeforeAfter(recycleBin[type], item.id);
    const updateLists = [...beforeList, ...afterList];
    return {
        ...recycleBin,
        [type]: updateLists
    };
}

const authenticationUserUpdateLists = (lists) => {
    let updateLists = [];
    if (lists) {
        updateLists = lists.map(item => {
            if (!('toDoList' in item)) {
                return { ...item, toDoList: [] };
            } else {
                return item;
            }
        })
    }
    return updateLists;
}

const updateItemInRecycleBin = (recycleBin, item, type) => {
    if (type === "tasks") {
        const [idxList, beforeList, afterList] = getBeforeAfterIdx(recycleBin.lists, item.listId);
        const updateToDoList = [...recycleBin.lists[idxList].toDoList, item];
        const updateList = { ...recycleBin.lists[idxList], toDoList: updateToDoList };
        const updateLists = [...beforeList, updateList, ...afterList];
        return updateLists;
    }
}

const updateRecycleBinFromDB = (recycleBin) => {

    if (recycleBin.lists) {
        const updateLists = recycleBin.lists.map(item => {
            if (!('toDoList' in item)) {
                return { ...item, toDoList: [] };
            } else {
                return item;
            }
        })
        recycleBin.lists = [...updateLists];
    } else {
        recycleBin = { ...recycleBin, lists: [] };
    }

    if (!recycleBin.subtasks) {
        recycleBin = { ...recycleBin, subtasks: [] };
    }

    if (!recycleBin.tasks) {
        recycleBin = { ...recycleBin, tasks: [] };
    }

    return recycleBin;
}

const updateNotification = (recycleBin, notification) => {

    if (recycleBin.tasks.length + recycleBin.lists.length + recycleBin.subtasks.length >= 30) {
        return {
            status: true,
            text: 'Корзина переполнена',
            color: 'warning'
        }
    }

    return notification;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_USER": {
            return {
                ...state,
                user: action.payload
            }
        }

        case "UPDATE_LOADING": {
            return {
                ...state,
                loading: action.payload
            }
        }

        case "UPDATE_ACTIVE_TODO_LIST_ID": {
            return {
                ...state,
                activeToDoListId: action.payload
            }
        }

        case "UPDATE_TODO_LIST_LABEL": {
            return {
                ...state,
                lists: updateToDoListLabel(state.lists, action.id, action.label),
            }
        }

        case "DELETE_TODO_LIST": {
            return {
                ...state,
                lists: deleteToDoList(state.lists, action.id, state.recycleBin),
                activeToDoListId: updateActiveListBeforeDelete(state.activeToDoListId, action.id),
                recycleBin: addItemToRecycleBin(state, action.id, "list"),
                notifacation: updateNotification(state.recycleBin, state.notifacation)
            }
        }

        case "UPDATE_LISTS": {
            return {
                ...state,
                lists: action.payload
            }
        }

        case "ADD_TODO_LIST": {
            return {
                ...state,
                lists: addToDoList(state.lists, action.payload)
            }
        }

        case "AUTHENTICATION_USER": {
            return {
                ...state,
                user: action.userId,
                lists: authenticationUserUpdateLists(action.lists),
                activeToDoListId: action.activeToDoListId,
                loading: action.loading,
                recycleBin: updateRecycleBinFromDB(action.recycleBin)
            }
        }

        case "SIGN_IN_ACCOUNT": {
            return {
                ...state,
                user: action.userId,
                lists: action.lists,
                activeToDoListId: null,
            }
        }

        case "SIGN_OUT_ACCOUNT": {
            return {
                ...state,
                user: false,
                lists: action.lists,
                activeToDoListId: null,
                recycleBin: {
                    lists: [],
                    tasks: [],
                    subtasks: []
                }
            }
        }

        case "ADD_TASK": {
            return {
                ...state,
                lists: addTask(state, action.label)
            }
        }

        case "DELETE_TASK": {
            return {
                ...state,
                lists: deleteTask(state, action.id),
                recycleBin: addItemToRecycleBin(state, action.id, "task"),
                notifacation: updateNotification(state.recycleBin, state.notifacation)
            }
        }

        case "TOGGLE_PROPERTY_TASK": {
            return {
                ...state,
                lists: togglePropertyTask(state, action.id, action.property)
            }
        }

        case "UPDATING_EDITED_TASK": {
            return {
                ...state,
                lists: updatingEditedTask(state, action.id, action.label)
            }
        }

        case "UPDATE_DATE_OR_TIME_TASK": {
            return {
                ...state,
                lists: updateDateOrTimeTask(state, action.id, action.date, action.time)
            }
        }

        case "ADD_SUB_TASK": {
            return {
                ...state,
                lists: addSubTask(state, action.taskId, action.label)
            }
        }

        case "UPDATE_DATE_OR_TIME_SUB_TASK": {
            return {
                ...state,
                lists: updateDateOrTimeSubTask(state, action.id, action.taskId, action.date, action.time)
            }
        }

        case "WORK_WITH_SUB_TASK": {
            return {
                ...state,
                lists: workWithSubTask(state, action.id, action.taskId, action.property, action.label),
                recycleBin: addItemToRecycleBin(state, action.id, "subtask", action.taskId, action.property, action.label),
                notifacation: updateNotification(state.recycleBin, state.notifacation)
            }
        }

        case "RESTORE_ITEM": {
            return {
                ...state,
                lists: restoreItem(state.lists, action.item, action.itemType),
                recycleBin: removeItemRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case "DESTROY_ITEM": {
            return {
                ...state,
                recycleBin: removeItemRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case "UPDATE_ITEM_IN_RECYCLE_BIN": {
            return {
                ...state,
                recycleBin: updateItemInRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case "CLEAR_NOTIFICATION": {
            return {
                ...state,
                notifacation: {
                    status: false,
                    text: '',
                    color: 'success'
                }
            }
        }

        default:
            return state
    }
};

export default reducer;