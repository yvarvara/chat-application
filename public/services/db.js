import Auth from "./auth.js"
import Utils from "./utils.js"

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

    async getUsersByQuery(query) {
        let users = [];

        await firebase.database().ref("users").orderByChild("displayName")
        .once("value").then(async (snapshot) => {
            const snap = snapshot.val();

            for (let uid in snap) {
                if (snap[uid].displayName.startsWith(query) && 
                !(await this.isUserInCurrentUserChats(uid)) &&
                uid !== Auth.currentUserID()) {

                    const user = {
                        uid: uid,
                        displayName: snap[uid].displayName,
                        photoURL: snap[uid].photoURL
                    };

                    users.push(user);
                }
            }
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

    async getCurrentUserChats() {
        const userChatsIDs = await this.getCurrentUserChatsIDs();
        let userChats = [];

        if (userChatsIDs)
            for (let id of userChatsIDs) {
                let chat = await this.getChatInfoById(id);

                if (!chat)
                    continue;

                chat.lastMessage = await DB.getChatLastMessage(chat.id); 
                userChats.push(chat);
            }

        function compare(a, b) {
            return a.timestamp > b.timestamp ? 1 :
            a.timestamp < b.timestamp ? -1 : 0;
        }

        userChats.sort(compare);
        return userChats;
    },

    async getCurrentUserChatsIDs() {
        let userChatsIDs = [];
    
        await firebase.database().ref(`users/${Auth.currentUserID()}/chats`)
        .once("value").then(function(snapshot) {
            snapshot.forEach(function (c) {
                userChatsIDs.push(c.key);
            });
        });
    
        return userChatsIDs;
    },

    async isUserID(uid) {
        let res = false;

        await firebase.database().ref(`users/${uid}`).once("value", function(snapshot) {
            if (snapshot.val())
                res = true;
        })

        return res;
    },

    async addUserChatsChildAddedListener(callback) {
        firebase.database().ref(`users/${Auth.currentUserID()}/chats`)
        .on("child_added", callback);
    },

    async isUserInCurrentUserChats(uid) {
        const currentUserChatsIDs = await this.getCurrentUserChatsIDs();
        
        for (let id of currentUserChatsIDs) {
            if (id.startsWith(uid) || id.endsWith(uid)) {
                return true;
            }
        }

        return false;
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
        const chatID = Utils.getTwoUsersChatID(memberA, memberB);
        let updates = {};

        updates[`chats/${chatID}/members/${memberA}`] = "";
        updates[`chats/${chatID}/members/${memberB}`] = "";
        updates[`users/${memberA}/chats/${chatID}`] = true
        updates[`users/${memberB}/chats/${chatID}`] = true
        
        await firebase.database().ref().update(updates);
    },

    async getChatInfoById(id) {
        let chat = null;

        await firebase.database().ref(`chats/${id}`).orderByChild("timestamp")
        .once("value").then(async (snapshot) => {
            if (!snapshot.val())
                return;

            chat = snapshot.val();
            chat.id = snapshot.key;

            if (!chat.name) {
                for (let m in chat.members) {
                    if (m !== Auth.currentUserID()) {
                        let user = await this.getUserInfo(m);
                        chat.name = user.displayName;
                        chat.photoURL = user.photoURL;

                        break;
                    }
                }
            }
        });

        return chat;
    },

    async addChannel(name, password, members) {
        const photoURL = "../images/group_avatar.png";
        let channel = {name, password, photoURL};

        const channelID = await firebase.database().ref(`chats`).push(channel).key;
        
        if (members) {
            for (let member of members) {
                let updates = {};
        
                updates[`chats/${channelID}/members/${member}`] = "";
                updates[`users/${member}/chats/${channelID}`] = true
              
                await firebase.database().ref().update(updates);
            }
        }
    },

    async addChannelMember(uid, channelID) {
        let updates = {};

        updates[`chats/${channelID}/members/${uid}`] = true;
        updates[`users/${uid}/chats/${channelID}`] = true;

        await firebase.database().ref().update(updates);
    },

    async getChannelsByQuery(query) {
        let channels = [];

        await firebase.database().ref("chats").orderByChild("name").
        once("value").then(async (snapshot) => {
            const snap = snapshot.val();

            for (let cid in snap) {                
                if (snap[cid].name && snap[cid].name.startsWith(query) && 
                !(await this.isChannelInCurrentUserChats(cid))) {

                    const channel = {
                        id: cid,
                        name: snap[cid].name,
                        photoURL: snap[cid].photoURL
                    } 

                    channels.push(channel);
                }
            }
        });

        return channels;
    },

    async isChannelInCurrentUserChats(cid) {
        const currentUserChatsIDs = await this.getCurrentUserChatsIDs();
        
        for (let id of currentUserChatsIDs) {
            if (id === cid) {
                return true;
            }
        }

        return false;
    },

    async addMessage(ref, chatID, sender, content, timestamp) {
        const message = { sender, content, timestamp };
        await ref.set(message);

        message.id = ref.key;
        await this.updateLastReadMessage(chatID, message);
        await firebase.database().ref(`chats/${chatID}/timestamp`).set(timestamp);

        return ref.key;
    },

    async getMessageSender(chatID, messageID) {
        let sender = null;

        await firebase.database().ref(`messages/${chatID}/${messageID}/sender`)
        .once("value", function(snapshot) {
            sender = snapshot.val();
        });

        return sender;
    },

    async getChatLastMessage(chatID) {
        let message = null;
        
        await firebase.database().ref(`messages/${chatID}`).limitToLast(1)
        .once("value", function(snapshot) {
            if (!snapshot.val())
                return;

            message = Object.values(snapshot.val())[0];
            message.id = Object.keys(snapshot.val())[0];
        });

        return message;
    },

    async addChatMessagesChildAddedListener(chatID, callback) {
        firebase.database().ref(`messages/${chatID}`).orderByChild("timestamp").
        startAt(Date.now()).on("child_added", callback);
    },

    async getNewMessageRef(chatID) {
        return await firebase.database().ref(`messages/${chatID}`).push();
    },

    async getMessages(chatID) {
        let messages = [];

        await firebase.database().ref(`messages/${chatID}`).once("value")
        .then(function (snapshot) {
            messages = snapshot.val();
        })

        return messages;
    },

    async updateLastReadMessage(chatID, message) {
        let updates = {};
        updates[`/chats/${chatID}/members/${Auth.currentUserID()}`] = message.id;
        await firebase.database().ref().update(updates);
    },

    async getUserLastReadMessageID(chatID, uid) {
        let messageID = "";

        await firebase.database().ref(`chats/${chatID}/members/${uid}`)
        .once("value", function(snapshot)  {
            messageID = snapshot.val();
        });

        return messageID;
    },

    async getUnreadMessagesCount(chatID, uid) {
        let lastReadMessageID = await this.getUserLastReadMessageID(chatID, uid);
        if (!lastReadMessageID && lastReadMessageID != "")
            return 0;

        let count = 0;
        await firebase.database().ref(`messages/${chatID}`).orderByKey()
        .startAt(lastReadMessageID).once("value").then(function(snapshot) {
            snapshot.forEach(function(s) {
                if (s.key !== lastReadMessageID)
                    count++;
            })
        });

        return count;
    },

    async getChannelLastReadMessageID(channelID) {
        let lastReadMessageID = "";
 
        await firebase.database().ref(`chats/${channelID}/members`).orderByValue()
        .limitToLast(2).once("value", function(snapshot) {
            lastReadMessageID = Object.values(snapshot.val())[1];
        })

        return lastReadMessageID;
    },

    async getUnreadMessagesCountChannel(channelID) {
        let lastReadMessageID = await this.getChannelLastReadMessageID(channelID);
        if (!lastReadMessageID && lastReadMessageID != "")
            return 0;

        let count = 0;

        await firebase.database().ref(`messages/${channelID}`).orderByKey()
        .startAt(lastReadMessageID).once("value").then(function(snapshot) {
            snapshot.forEach(function(s) {
                if (s.key !== lastReadMessageID)
                    count++;
            })
        });

        return count;
    },

    async addLastReadChangedListener(chatID, callback) {
        firebase.database().ref(`chats/${chatID}/members`)
        .on("child_changed", callback);
    },

    async addConnectionStateListener(callback) {
        firebase.database().ref('.info/connected').on('value', callback);
    },

    async getConnentionState(uid) {
        await firebase.database().ref(`users/${uid}/connection`).on("value", 
        async (snapshot) => {
            if (uid === Utils.parseUrl().id) {
                if (snapshot.val().isConnected === true) {
                    document.getElementById("connState").innerHTML = "online";
                } else {
                    document.getElementById("connState").innerHTML = 
                    "last seen: " + Utils.toTimeString(new Date(snapshot.val().lastOnline));
                }
            }
        });
    },

    async getLastOnline(uid) {
        let lastOnline = null;

        await firebase.database().ref(`users/${uid}/lastOnline`).once("value", function(snapshot) {
            lastOnline = snapshot.val();
        });

        return Utils.toTimeString(new Date(lastOnline));
    }
};
 
export default DB