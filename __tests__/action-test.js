import { addToDoListAC, deleteToDoListAC, updateToDoListLabelAC, addTaskAC, deleteTaskAC } from '../src/redux/action/action.js';

const list = {
    id: 1337,
    label: 'Спорт',
    toDoList: []
}

test('ACTION: addToDoListAC', () => {
    const add = addToDoListAC(list);
    expect(add).toEqual({
        type: "ADD_TODO_LIST",
        payload: list
    })
});

test('ACTION: deleteToDoListAC', () => {
    const deleteList = deleteToDoListAC(list.id);
    expect(deleteList).toEqual({
        type: "DELETE_TODO_LIST",
        id: list.id
    })
});

test('ACTION: updateToDoListLabelAC', () => {
    const updateList = updateToDoListLabelAC(list.id, 'Обновлённый спорт');
    expect(updateList).toEqual({
        type: "UPDATE_TODO_LIST_LABEL",
        id: list.id,
        label: 'Обновлённый спорт'
    })
});

test('ACTION: addTaskAC', () => {
    const add = addTaskAC('Новая задача');
    expect(add).toEqual({
        type: "ADD_TASK",
        label: "Новая задача"
    })
});

test('ACTION: deleteTaskAC', () => {
    const deleteTask = deleteTaskAC(1337);
    expect(deleteTask).toEqual({
        type: "DELETE_TASK",
        id: 1337
    })
});