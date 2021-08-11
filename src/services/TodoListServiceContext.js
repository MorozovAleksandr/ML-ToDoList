// context API для сервиса

import React from 'react';
const {
    Provider: TodoListServiceProvider,
    Consumer: TodoListServiceConsumer
} = React.createContext();

export {
    TodoListServiceProvider,
    TodoListServiceConsumer
}