import DB from "./db.js"

let Auth = {
    register: (username, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((credentials) => {

            DB.addUser(credentials.user.uid, username, email).then(() => {
                window.location.href = "/";
            });            
        });
    },

    login: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((credentials) => {
            DB.addConnectionStateListener(credentials.user.uid);
            window.location.href = "/";
        });
    },

    logout: () => {
        let uid = Auth.currentUserID();
        let ref = firebase.database().ref(`users/${uid}/connection`);
        ref.child("isConnected").set(false);
        ref.child("lastOnline").set(firebase.database.ServerValue.TIMESTAMP);

        firebase.auth().signOut().then(() => {
            window.location.href = "/";
        }).catch(err => {
            console.error(err.code);
            console.error(err.message);
        });
    },

    currentUserID: () => {
        let curUser = firebase.auth().currentUser;
        let uid = curUser ? curUser.uid : null;
        return uid;
    }
}

export default Auth