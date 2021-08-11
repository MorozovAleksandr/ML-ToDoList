// HOC Для обёртки компонентов сервисом

import React from 'react';
import { TodoListServiceConsumer } from '../../services/TodoListServiceContext';

const withTodoListService = () => (Wrapped) => {
    return (props) => {
        return (
            <TodoListServiceConsumer>
                {
                    (todolistService) => {
                        return (<Wrapped {...props} todolistService={todolistService} />)
                    }
                }
            </TodoListServiceConsumer>
        )
    }
};

export default withTodoListService;