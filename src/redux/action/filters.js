import {
    TOGGLE_FILTER,
    OFF_FILTER
} from '../constans';

const toggleFilterAC = (filter) => {
    return {
        type: TOGGLE_FILTER,
        filter
    }
}

const offFilterAC = (filter) => {
    return {
        type: OFF_FILTER,
        filter
    }
}

export {
    toggleFilterAC,
    offFilterAC
}