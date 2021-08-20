"use strict";

import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Lists from '../src/components/Lists/Lists';
import AddToDoItem from '../src/components/ToDoList/AddToDoItem/AddToDoItem';
import ToDoListItem from '../src/components/ToDoList/ToDoListItem/ToDoListItem';
configure({ adapter: new Adapter() });

const initialState = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: [
        {
            id: 1,
            label: "Магазин",
            toDoList: []
        },
    ],
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
}

const newList = {
    label: 'Мой новый список'
}

test('Проверка добавления списка', () => {

    //redux-mock-store
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // создаём тестовую версию компонента
    const component = mount(
        <Provider store={store}><Lists /></Provider>
    )

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // Ищем кнопку и кликаем
    component.find('.lists__addListButton').simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    const inputName = component.find('.MuiInputBase-input');
    inputName.getDOMNode().value = newList.label;
    inputName.simulate('change');
    expect(inputName.getDOMNode().value).toEqual(newList.label);

    expect(toJson(component)).toMatchSnapshot();

    component.find('.saveButton').at(0).simulate('click');

    expect(toJson(component)).toMatchSnapshot();
});

test('Проверка удаления списка', () => {

    //redux-mock-store
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // создаём тестовую версию компонента
    const component = mount(
        <Provider store={store}><Lists /></Provider>
    )

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // Ищем кнопку и кликаем
    component.find('.list__buttonMenu').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // Ищем кнопку и кликаем
    component.find('.ListItem_delete').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();
});

test('Проверка изменения списка', () => {

    //redux-mock-store
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // создаём тестовую версию компонента
    const component = mount(
        <Provider store={store}><Lists /></Provider>
    )

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // Ищем кнопку и кликаем
    component.find('.list__buttonMenu').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // Ищем кнопку и кликаем
    component.find('.ListItem_edit').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    const inputName = component.find('.MuiInputBase-input').at(0);
    inputName.simulate('change', { target: { value: 'updatedList' } });
    expect(inputName.getDOMNode().value).toEqual('updatedList');

    expect(toJson(component)).toMatchSnapshot();
});


const initialState2 = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: [
        {
            id: 1,
            label: "Магазин",
            toDoList: []
        },
    ],
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
}

test('Проверка добавления Задачи', () => {
    //redux-mock-store
    const mockStore = configureStore();
    const store = mockStore(initialState2);

    // создаём тестовую версию компонента
    const component = mount(
        <Provider store={store}><AddToDoItem /></Provider>
    )

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();


    // Ищем инпут и меняем значение
    const inputName = component.find('.addToDoItem__input').at(0);
    inputName.getDOMNode().value = "Новая задача";
    inputName.simulate('change');
    expect(inputName.getDOMNode().value).toEqual("Новая задача");

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();

    // ищем кнопку и кликаем
    component.find('.addToDoItem__button').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();
});

test('Проверка удаления Задачи', () => {

    const task = {
        label: "Задача1",
        important: false,
        done: false,
        subtask: null,
        date: null,
        time: null,
        id: 13371488
    };

    //redux-mock-store
    const mockStore = configureStore();
    const store = mockStore(initialState2);

    // создаём тестовую версию компонента
    const component = mount(
        <Provider store={store}><ToDoListItem key={task.id} item={task} /></Provider>
    )

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();


    // Ищем кнопку и кликаем
    component.find('.ToDoListItem__button_delete').at(0).simulate('click');

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    expect(toJson(component)).toMatchSnapshot();
});