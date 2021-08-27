import crypto from "crypto";
import {
    getBeforeAfterIdx
} from './shared';

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
    const [idxList, beforeList, afterList] = getBeforeAfterIdx(state.lists, state.activeToDoListId);
    const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(state.lists[idxList].toDoList, taskId);
    const [idxSubTask, beforeSubTask, afterSubTask] = getBeforeAfterIdx(state.lists[idxList].toDoList[idxTask].subtask, id);

    const oldSubTask = state.lists[idxList].toDoList[idxTask].subtask[idxSubTask];

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

    const oldSubTask = lists[idxList].toDoList[idxTask].subtask[idxSubTask];
    let newSubTask;
    let updateTask;

    if (property) {
        newSubTask = { ...oldSubTask, [property]: !oldSubTask[property] };
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

    if (label) {
        newSubTask = { ...oldSubTask, label: label };
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

    if (!label && !property) {
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

export {
    addSubTask,
    updateDateOrTimeSubTask,
    workWithSubTask
}