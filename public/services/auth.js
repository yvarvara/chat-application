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
            console.log(credentials.user);
            window.location.href = "/";
        });
    },

    logout: () => {
        firebase.auth().signOut().then(() => {
            window.location.href = "/";
        }).catch(err => {
            console.error(err.code);
            console.error(err.message);
        });
    },

    currentUserID: () => {
        return firebase.auth().currentUser.uid;
    }
}

export default Auth