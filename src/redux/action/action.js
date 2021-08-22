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

const updateToDoListLabelAC = (id, label) => {
    return {
        type: "UPDATE_TODO_LIST_LABEL",
        id: id,
        label: label
    }
}

const updateListsAC = (lists) => {
    return {
        type: "UPDATE_LISTS",
        payload: lists
    }
}

const authenticationUserAC = (userId, lists, activeToDoListId, loading, recycleBin) => {
    return {
        type: "AUTHENTICATION_USER",
        userId,
        lists,
        activeToDoListId,
        loading,
        recycleBin
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

const deleteToDoListAC = (id) => {
    return {
        type: "DELETE_TODO_LIST",
        id
    }
}

const addTaskAC = (label) => {
    return {
        type: "ADD_TASK",
        label
    }
}

const deleteTaskAC = (id) => {
    return {
        type: "DELETE_TASK",
        id
    }
}

const togglePropertyTaskAC = (id, property) => {
    return {
        type: "TOGGLE_PROPERTY_TASK",
        id,
        property
    }
}

const updatingEditedTaskAC = (id, label) => {
    return {
        type: "UPDATING_EDITED_TASK",
        id,
        label
    }
}

const updateDateOrTimeTaskAC = (id, date = null, time = null) => {
    return {
        type: "UPDATE_DATE_OR_TIME_TASK",
        id,
        date,
        time
    }
}

const addSubTaskAC = (taskId, label) => {
    return {
        type: "ADD_SUB_TASK",
        taskId,
        label
    }
}

const updateDateOrTimeSubTaskAC = (id, taskId, date = null, time = null) => {
    return {
        type: "UPDATE_DATE_OR_TIME_SUB_TASK",
        id,
        taskId,
        date,
        time
    }
}

const workWithSubTaskAC = (id, taskId, property = null, label = null) => {
    return {
        type: "WORK_WITH_SUB_TASK",
        id,
        taskId,
        property,
        label
    }
}

const restoreItemAC = (item, itemType) => {
    return {
        type: "RESTORE_ITEM",
        item,
        itemType
    }
}

const destroyItemAC = (item, itemType) => {
    return {
        type: "DESTROY_ITEM",
        item,
        itemType
    }
}

const updateItemInRecycleBinAC = (item, itemType) => {
    return {
        type: "UPDATE_ITEM_IN_RECYCLE_BIN",
        item,
        itemType
    }
}

const clearNotificationAC = () => {
    return {
        type: "CLEAR_NOTIFICATION"
    }
}

const toggleFilterAC = (filter) => {
    return {
        type: "TOGGLE_FILTER",
        filter
    }
}

const offFilterAC = (filter) => {
    return {
        type: "OFF_FILTER",
        filter
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
    addTaskAC,
    deleteTaskAC,
    togglePropertyTaskAC,
    updatingEditedTaskAC,
    updateDateOrTimeTaskAC,
    addSubTaskAC,
    updateDateOrTimeSubTaskAC,
    workWithSubTaskAC,
    restoreItemAC,
    updateItemInRecycleBinAC,
    destroyItemAC,
    clearNotificationAC,
    toggleFilterAC,
    offFilterAC
}