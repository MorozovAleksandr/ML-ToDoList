import {
    getBeforeAfterIdx,
    getBeforeAfter
} from './shared';

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

export { updateToDoListLabel, deleteToDoList, addToDoList, updateActiveListBeforeDelete };