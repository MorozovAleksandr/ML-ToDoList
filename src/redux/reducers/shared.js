const getBeforeAfterIdx = (items, id) => {
    const idx = items.findIndex(item => item.id === id);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [idx, b, a];
}

const getBeforeAfter = (items, id) => {
    const idx = items.findIndex(item => item.id === id);
    const b = items.slice(0, idx);
    const a = items.slice(idx + 1);
    return [b, a];
}

const initialFilters = [
    {
        id: 0,
        filter: "important",
        status: false,
        title: "Важные"
    },
    {
        id: 1,
        filter: "notImportant",
        status: false,
        title: "Не важные"
    },
    {
        id: 2,
        filter: "done",
        status: false,
        title: "Выполненные"
    },
    {
        id: 3,
        filter: "toDone",
        status: false,
        title: "Не выполненные"
    }
];

const initialState = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: [],
    recycleBin: {
        lists: [],
        tasks: [],
        subtasks: []
    },
    notifacation: {
        status: false,
        text: '',
        color: ''
    },
    filters: initialFilters
}

export {
    getBeforeAfterIdx,
    getBeforeAfter,
    initialFilters,
    initialState
};