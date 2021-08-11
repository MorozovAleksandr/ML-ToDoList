import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import TodoListService from './services/todolist-service'
import { TodoListServiceProvider } from './services/TodoListServiceContext';

const todolistService = new TodoListService();

const firebaseConfig = {
    apiKey: "AIzaSyBptQB6Avdv_vfIsCadyqxke2s1HCrXK0I",
    authDomain: "ml-todolist.firebaseapp.com",
    databaseURL: "https://ml-todolist-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ml-todolist",
    storageBucket: "ml-todolist.appspot.com",
    messagingSenderId: "487726663682",
    appId: "1:487726663682:web:0de1c94bb734f629be3f1b"
};

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
