import firebase from 'firebase/app';

export default class TodoListService {
    sendListToDB = (uid, newLists, newUser) => {
        if (uid || newUser) {
            firebase.database().ref(`users/${uid}`).update({
                lists: newLists
            });
        }
    }

    sendRecycleBinToDB = (uid, newRecycleBin, newUser) => {
        if (uid || newUser) {
            firebase.database().ref(`users/${uid}`).update({
                recyclebin: newRecycleBin
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