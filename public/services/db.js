import Auth from "./auth.js"

let DB = {
    async addUser(uid, username, email) {
        await firebase.database().ref(`users/${uid}`).set({
            displayName: username,
            photoURL: "../images/Dark_Blue_Moon_Emoji_grande.png",
            email: email
        }, function (err) {
            if (err) {
                console.error(err.message);
            }
        }
    )},

    async getUserByUsername(username) {
        let users = [];
        const currentUserChatsIDs = await getCurrentUserChatsIDs();

        await firebase.database().ref("users").orderByChild("displayName")
        .once("value").then(function(snapshot) {
            snapshot.forEach(function (u) {
                let user = u.val();

                if (user.displayName.startsWith(username)) {
                    let f = true;

                    for (let id of currentUserChatsIDs) {
                        if (id.startsWith(u.key) || id.endsWith(u.key)) {
                            f = false;
                            break;  
                        }
                    }

                    if (f) {
                        user.uid = u.key;
                        users.push(user);
                    }
                }
            });
        });

        return users;
    },

    async getUserInfo(uid) {
        let user = null;

        await firebase.database().ref(`users/${uid}`).once("value", function(snapshot) {
            user = snapshot.val();
        });

        return user;
    },

    async getUserChats(uid, userChatsIDs) {
        let userChats = [];

        for (let uc in userChatsIDs) {
            let chat = null;
            await firebase.database().ref(`chats/${uc}`).once("value", function(snapshot) {
                chat = snapshot.val();
            });

            let userChat = {
                id: uc
            };

            if (chat.name) {
                userChat.name = chat.name;
                userChat.photoURL = chat.photoURL;
            } else {
                for (let m in chat.members) {
                    if (m !== uid) {
                        let peer = null;

                        await firebase.database().ref(`users/${m}`).once("value", function(snapshot) {
                            peer = snapshot.val();
                        });

                        userChat.name = peer.displayName;
                        userChat.photoURL = peer.photoURL;
                    }
                }
            }

            userChats.push(userChat);
        }

        return userChats;
    },

    async updateUserInfo(uid, displayName, photoURL) {
        await firebase.database().ref(`users/${uid}`).update({
            displayName,
            photoURL
        }, function (err) {
            if (err) {
                console.error(err.message);
            }
        });
    },

    async addChat(memberA, memberB) {
        const chatID = (memberA > memberB) ? (memberA + memberB) : (memberB + memberA);
        addChatMembers(chatID, [memberA, memberB]);
    },

    async addChannel(name, password, members) {
        let chat = null;
        const photoURL = "../images/group_avatar.png";

        if (name && password)
            chat = {name, password, photoURL};
        else if (name) 
            chat = {name, photoURL};

        const chatID = await firebase.database().ref(`chats`).push(chat).key;
        
        if (members)
            addChatMembers(chatID, members);
    },

    async getChannelsByName(name) {
        let channels = [];
        const currentUserChatsIDs = await getCurrentUserChatsIDs();

        await firebase.database().ref("chats").once("value")
        .then(function(snapshot) {
            snapshot.forEach(function (c) {
                let channel = c.val();
                
                if (channel.name && channel.name.startsWith(name)) {
                    if (!currentUserChatsIDs.includes(c.key)) {
                        channel.id = c.key;
                        delete channel.members;
                        channels.push(channel);
                    }
                }
            })
        });

        return channels;
    }
};

async function getCurrentUserChatsIDs() {
    let userChatsIDs = [];

    await firebase.database().ref(`users/${Auth.currentUserID()}/chats`)
    .once("value").then(function(snapshot) {
        snapshot.forEach(function (c) {
            userChatsIDs.push(c.key);
        });
    });

    return userChatsIDs;
}

async function addChatMembers(chatID, members) {
    for (let member of members) {
        let updates = {};

        updates[`chats/${chatID}/members/${member}`] = true;
        updates[`users/${member}/chats/${chatID}`] = true;
      
        await firebase.database().ref().update(updates);
    }
}

export default DB