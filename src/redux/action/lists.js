import { UPDATE_ACTIVE_TODO_LIST_ID, ADD_TODO_LIST, UPDATE_TODO_LIST_LABEL, UPDATE_LISTS, DELETE_TODO_LIST } from '../constans';

const updateActiveTodoListIdAC = (id) => {
    return {
        type: UPDATE_ACTIVE_TODO_LIST_ID,
        payload: id
    }
}

const addToDoListAC = (list) => {
    return {
        type: ADD_TODO_LIST,
        payload: list
    }
}

const updateToDoListLabelAC = (id, label) => {
    return {
        type: UPDATE_TODO_LIST_LABEL,
        id: id,
        label: label
    }
}

const updateListsAC = (lists) => {
    return {
        type: UPDATE_LISTS,
        payload: lists
    }
}

const deleteToDoListAC = (id) => {
    return {
        type: DELETE_TODO_LIST,
        id
    }
}

export {
    updateActiveTodoListIdAC,
    addToDoListAC,
    updateToDoListLabelAC,
    updateListsAC,
    deleteToDoListAC
};