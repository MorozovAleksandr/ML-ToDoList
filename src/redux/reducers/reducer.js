
import crypto from "crypto";

const initialState = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: []
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

const deleteToDoList = (lists, id) => {
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

const workWithSubTask = ({ lists, activeToDoListId }, id, taskId, property, label) => {
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
                lists: deleteToDoList(state.lists, action.id),
                activeToDoListId: updateActiveListBeforeDelete(state.activeToDoListId, action.id)
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
                lists: action.lists,
                activeToDoListId: action.activeToDoListId,
                loading: action.loading
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
                lists: deleteTask(state, action.id)
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
                lists: workWithSubTask(state, action.id, action.taskId, action.property, action.label)
            }
        }

        default:
            return state
    }
};

export default reducer;