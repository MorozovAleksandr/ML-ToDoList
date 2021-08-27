import {
    ADD_SUB_TASK,
    UPDATE_DATE_OR_TIME_SUB_TASK,
    WORK_WITH_SUB_TASK
} from '../constans';

const addSubTaskAC = (taskId, label) => {
    return {
        type: ADD_SUB_TASK,
        taskId,
        label
    }
}

const updateDateOrTimeSubTaskAC = (id, taskId, date = null, time = null) => {
    return {
        type: UPDATE_DATE_OR_TIME_SUB_TASK,
        id,
        taskId,
        date,
        time
    }
}

const workWithSubTaskAC = (id, taskId, property = null, label = null) => {
    return {
        type: WORK_WITH_SUB_TASK,
        id,
        taskId,
        property,
        label
    }
}

export {
    addSubTaskAC,
    updateDateOrTimeSubTaskAC,
    workWithSubTaskAC
}