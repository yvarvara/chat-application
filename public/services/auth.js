let Auth = {
    register: (username, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((credentials) => {
            console.log(credentials.user);
            window.location.href = "/";
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
    }
}

export default Auth