const updateActiveTodoListIdAC = (id) => {
    return {
        type: "UPDATE_ACTIVE_TODO_LIST_ID",
        payload: id
    }
}

const addToDoListAC = (list) => {
    return {
        type: "ADD_TODO_LIST",
        payload: list
    }
}

const updateToDoListLabelAC = (newLists) => {
    return {
        type: "UPDATE_TODO_LIST_LABEL",
        payload: newLists
    }
}

const updateListsAC = (lists) => {
    return {
        type: "UPDATE_LISTS",
        payload: lists
    }
}

const authenticationUserAC = (userId, lists, activeToDoListId, loading) => {
    return {
        type: "AUTHENTICATION_USER",
        userId,
        lists,
        activeToDoListId,
        loading
    }
}

const signOutAccountAC = (lists) => {
    return {
        type: "SIGN_OUT_ACCOUNT",
        lists
    }
}

const signInAccountAC = (userId, lists) => {
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
    addToDoListAC,
    updateToDoListLabelAC,
    deleteToDoListAC,
    updateActiveTodoListIdAC,
    updateListsAC,
    authenticationUserAC,
    signOutAccountAC,
    signInAccountAC,
}