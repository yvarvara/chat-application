let Auth = {
    register: (username, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((credentials) => {
            credentials.user.updateProfile({
                displayName: username,
                photoURL: "../images/Dark_Blue_Moon_Emoji_grande.png"
            }).then(function() {
                console.log(credentials.user);
                window.location.href = "/";
            }).catch(err => {
                console.error(err.code);
                console.error(err.message);
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

    currentUser: () => {
        return firebase.auth().currentUser;
    }
}

export default Auth