import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

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
  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>
  ,
  document.getElementById('root')
);
