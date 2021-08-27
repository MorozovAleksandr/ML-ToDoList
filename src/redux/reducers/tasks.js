import crypto from "crypto";
import {
    getBeforeAfterIdx,
    getBeforeAfter
} from './shared';

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

const addTask = (state, label) => {
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);

    if (state.lists[idxList].toDoList.length >= 40) {
        return state.lists;
    }

    const updateToDoList = [...state.lists[idxList].toDoList, createTask(label)];
    const updateList = { ...state.lists[idxList], toDoList: updateToDoList };
    const updateLists = [...beforeList, updateList, ...afterList];
    return updateLists;
};

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

export {
    addTask,
    deleteTask,
    togglePropertyTask,
    updatingEditedTask,
    updateDateOrTimeTask
};