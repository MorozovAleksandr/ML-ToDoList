import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import TodoListService from './services/todolist-service'
import { TodoListServiceProvider } from './services/TodoListServiceContext';
import { firebaseConfig } from './shared/index'

const todolistService = new TodoListService();

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <TodoListServiceProvider value={todolistService}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </TodoListServiceProvider>
        </React.Fragment>
    </Provider>
    ,
    document.getElementById('root')
);
