import {
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_PROPERTY_TASK,
    UPDATING_EDITED_TASK,
    UPDATE_DATE_OR_TIME_TASK
} from '../constans';

const addTaskAC = (label) => {
    return {
        type: ADD_TASK,
        label
    }
}

const deleteTaskAC = (id) => {
    return {
        type: DELETE_TASK,
        id
    }
}

const togglePropertyTaskAC = (id, property) => {
    return {
        type: TOGGLE_PROPERTY_TASK,
        id,
        property
    }
}

const updatingEditedTaskAC = (id, label) => {
    return {
        type: UPDATING_EDITED_TASK,
        id,
        label
    }
}

const updateDateOrTimeTaskAC = (id, date = null, time = null) => {
    return {
        type: UPDATE_DATE_OR_TIME_TASK,
        id,
        date,
        time
    }
}

export {
    addTaskAC,
    deleteTaskAC,
    togglePropertyTaskAC,
    updatingEditedTaskAC,
    updateDateOrTimeTaskAC
}