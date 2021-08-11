import firebase from 'firebase/app';

export default class TodoListService {
    sendListToDB = (uid, newLists, newUser) => {
        if (uid || newUser) {
            firebase.database().ref(`users/${uid}`).update({
                lists: newLists
            });
        }
    }

    sendActiveToDoListIdToDB = (uid, id) => {
        if (uid) {
            firebase.database().ref(`users/${uid}`).update({
                activetodolistid: id
            })
        }
    }
}