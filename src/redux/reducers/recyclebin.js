import {
    getBeforeAfterIdx,
    getBeforeAfter
} from './shared';


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

        if (subtasks.length) {
            const searchSubtasks = subtasks.filter(subtask => subtask.listId === id);
            updateItem.toDoList.forEach(task => {
                searchSubtasks.forEach(subtask => {
                    if (task.id === subtask.taskId) {
                        const [idxTask, beforeTask, afterTask] = getBeforeAfterIdx(updateItem.toDoList, task.id);
                        const updateTask = { ...updateItem.toDoList[idxTask], subtask: [...updateItem.toDoList[idxTask].subtask, subtask] };
                        updateItem = { ...updateItem, toDoList: [...beforeTask, updateTask, ...afterTask] };

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

export {
    addItemToRecycleBin,
    restoreItem,
    removeItemRecycleBin,
    updateItemInRecycleBin,
    updateRecycleBinFromDB
};