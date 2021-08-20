import reducer from '../src/redux/reducers/reducer.js';

test('REDUCER: Добавление листа', () => {
    let state = {
        lists: [{
            id: 1337,
            label: 'Спорт',
            toDoList: []
        }]
    };

    const newList = {
        id: 228,
        label: 'Магазин',
        toDoList: []
    };

    state = reducer(state, { type: "ADD_TODO_LIST", payload: newList });

    expect(state).toEqual({
        lists: [
            {
                id: 1337,
                label: 'Спорт',
                toDoList: []
            },
            {
                id: 228,
                label: 'Магазин',
                toDoList: []
            }
        ]
    })
});

test('REDUCER: Удаление листа + добавление его в корзину', () => {
    let state = {
        lists: [{
            id: 1337,
            label: 'Спорт',
            toDoList: []
        }],
        recycleBin: {
            lists: [],
            tasks: [],
            subtasks: []
        }
    };

    state = reducer(state, { type: "DELETE_TODO_LIST", id: 1337 });

    expect(state).toEqual({
        lists: [],
        recycleBin: {
            lists: [{
                id: 1337,
                label: 'Спорт',
                toDoList: []
            }],
            tasks: [],
            subtasks: []
        }
    })
});

test('REDUCER: Изменение листа', () => {
    let state = {
        lists: [{
            id: 1337,
            label: 'Спорт',
            toDoList: []
        }]
    };

    state = reducer(state, { type: "UPDATE_TODO_LIST_LABEL", id: 1337, label: "Обновлённый спорт" });

    expect(state).toEqual({
        lists: [
            {
                id: 1337,
                label: 'Обновлённый спорт',
                toDoList: []
            }
        ]
    })
});

test('REDUCER: Добавление задачи', () => {
    let state = {
        lists: [{
            id: 1337,
            label: 'Спорт',
            toDoList: []
        }],
        activeToDoListId: 1337
    };

    state = reducer(state, { type: "ADD_TASK", label: "Новая задача" });

    expect(state).toEqual({
        lists: [
            {
                id: 1337,
                label: 'Спорт',
                toDoList: [
                    {
                        label: "Новая задача",
                        important: false,
                        done: false,
                        subtask: null,
                        date: null,
                        time: null,
                        id: state.lists[0].toDoList[0].id
                    }
                ]
            }
        ],
        activeToDoListId: 1337
    })
});

test('REDUCER: Удаление задачи + добавление её в корзину', () => {
    let state = {
        lists: [{
            id: 1337,
            label: 'Спорт',
            toDoList: [
                {
                    label: "Задача1",
                    important: false,
                    done: false,
                    subtask: null,
                    date: null,
                    time: null,
                    id: 13371488
                }
            ]
        }],
        activeToDoListId: 1337,
        recycleBin: {
            lists: [],
            tasks: [],
            subtasks: []
        },
        notifacation: {
            status: false,
            text: '',
            color: ''
        }
    };

    state = reducer(state, { type: "DELETE_TASK", id: 13371488 });

    expect(state).toEqual({
        lists: [
            {
                id: 1337,
                label: 'Спорт',
                toDoList: [
                ]
            }
        ],
        activeToDoListId: 1337,
        recycleBin: {
            lists: [],
            tasks: [
                {
                    label: "Задача1",
                    important: false,
                    done: false,
                    subtask: null,
                    date: null,
                    time: null,
                    id: 13371488,
                    listId: 1337,
                    subtask: []
                }
            ],
            subtasks: []
        },
        notifacation: {
            status: false,
            text: '',
            color: ''
        }
    })
});