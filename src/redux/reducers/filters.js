import {
    initialFilters
} from './shared';


const getBeforeAfterIdxFilter = (items, filter) => {
    const idx = items.findIndex(item => item.filter === filter);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [idx, b, a];
}

const updateFilters = (filters, filter, falseStatus = false) => {
    const [idxFilter, beforeFilter, afterFilter] = getBeforeAfterIdxFilter(filters, filter);
    let updateFilter;

    if (falseStatus) {
        updateFilter = { ...filters[idxFilter], status: false };
    } else {
        if (filter === "important") {

        }
        updateFilter = { ...filters[idxFilter], status: !filters[idxFilter].status };
    }

    const updateFilters = [...beforeFilter, updateFilter, ...afterFilter];

    return updateFilters;
}

const updateFiltersBeforeDeleteList = (activeToDoListId, id, filters) => {
    return activeToDoListId === id ? initialFilters : filters;
}

export {
    updateFiltersBeforeDeleteList,
    updateFilters
};