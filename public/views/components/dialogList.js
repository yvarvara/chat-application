import DB from "../../services/db.js"
import Auth from "../../services/auth.js";
import Chat from "./chat.js";
import Utils from "../../services/utils.js";

let chatsList = [];
let activeDialog = null;

let DialogList = {
    init: true,

    render : async () => {
        return /*html*/`
        <div class="search-bar">
            <div class="search-input-wrapper">
                <i class="fa fa-search search"></i>
                <input type="search" name="search" id="search">
            </div>
        </div>
        <ul id="dialogList" class="dialog-list">
            <p class="not-found">No chats yet</p>
        </ul>
        <ul id="searchResult" class="dialog-list">
            <ul id="searchResultDialogs"></ul>
            <p>Channels</p>
            <ul id="searchResultChannels"></ul>
            <p>Users</p>
            <ul id="searchResultUsers"></ul>
        </ul>
        `
    },

    afterRender : async () => {
        addSearchInputEventListener();
    },

    renderNewChat: async (chatInfo) => {
        const dialogList = document.getElementById("dialogList");
        if (!dialogList)
            return;

        const notFound = document.querySelector(".not-found");
        if (notFound)
            notFound.remove();

        chatsList.push(chatInfo);

        const userID = Utils.getChatPeerID(chatInfo.id);

        let chat = document.createElement("li");
        chat.classList.add("dialog");
        chat.id = userID;

        const message = chatInfo.lastMessage;

        if (message) {
            const timestamp = new Date(message.timestamp);
            const className = (message.sender === Auth.currentUserID()) ? 
            "last-msg-out" : "last-msg-in";
    
            let unread = ""; 
            if (message.sender === Auth.currentUserID()) {
                if ((userID !== chatInfo.id && await DB.getUnreadMessagesCount(chatInfo.id, userID) > 0) || 
                (userID === chatInfo.id && await DB.getUnreadMessagesCountChannel(userID) > 0))
                    unread = `<i class="fa fa-circle"></i>`
            } else {
                let count = await DB.getUnreadMessagesCount(chatInfo.id, Auth.currentUserID());
                if (count > 0)
                    unread = `<p class="unread">${count}</p>`; 
            }

            chat.innerHTML = `
                <img class="avatar" src="${chatInfo.photoURL}" alt="Avatar">
                <div class="dialog-info">
                    <p class="username">${chatInfo.name}</p>
                    <p class="${className}">${message.content}</p>
                </div>
                <div class="dialog-info">
                    <time datetime="${timestamp.toISOString()}">${Utils.toTimeString(timestamp)}</time>
                    ${unread}
                </div>
                `;
        } else {
            chat.innerHTML = `
                <img class="avatar" src="${chatInfo.photoURL}" alt="Avatar">
                <div class="dialog-info">
                    <p class="username">${chatInfo.name}</p>
                    <p class="last-msg"></p>
                </div>
                <div class="dialog-info">
                    <time></time>
                </div>
                `;
        }

        dialogList.prepend(chat);
    },

    afterNewChatRender: async(chatID) => {
        const userID = Utils.getChatPeerID(chatID);

        const dialog = document.getElementById(userID);
        addDialogClickEventListener(dialog);

        await DB.addChatMessagesChildAddedListener(chatID, async (snapshot) => {         
            let message = snapshot.val();
            message.id = snapshot.key;

            // get new message while dialog active
            if (activeDialog && activeDialog.id === userID
            && message.sender !== Auth.currentUserID()) {
                await Chat.renderNewMessage(message);
                await DB.updateLastReadMessage(chatID, message);
            }

            updateDialogLastMessage(userID, message);
            dialogList.prepend(dialog);
        });

        await DB.addLastReadChangedListener(chatID, async (snapshot) => {
            // my messages read
            if (activeDialog && activeDialog.id === userID
            && snapshot.key !== Auth.currentUserID()
            && await DB.getMessageSender(chatID, snapshot.val()) ===
            Auth.currentUserID()) {
                Chat.removeMessageStatusIcons();

                let dialogInfoIcon = document.querySelector(`#${userID} .dialog-info:nth-of-type(2) i`);
                if (dialogInfoIcon)
                    dialogInfoIcon.remove();

                return;
            }

            // send new message
            if (await DB.getMessageSender(chatID, snapshot.val()) ===
            Auth.currentUserID()) {
                let dialogInfo = document.querySelector(`#${userID} .dialog-info:nth-of-type(2)`);

                let unreadCountIcon = document.createElement("i");
                unreadCountIcon.classList.add("fa", "fa-circle");

                if (dialogInfo.children.length > 1)
                    dialogInfo.children[1].remove(); 
                
                dialogInfo.append(unreadCountIcon);

                return;
            }

            let chatLastMsgID = (await DB.getChatLastMessage(chatID)).id;
            let userLastRead = await DB.getUserLastReadMessageID(chatID, Auth.currentUserID());

            // read new messages
            if (snapshot.key === Auth.currentUserID() && 
            chatLastMsgID === userLastRead) {
                let unreadCount = document.querySelector(`#${userID} .dialog-info:nth-of-type(2) p`);
                if(unreadCount)
                    unreadCount.remove();
            }

            // get new message
            if (snapshot.key !== Auth.currentUserID() && chatLastMsgID !== userLastRead) {
                let dialogInfo = document.querySelector(`#${userID} .dialog-info:nth-of-type(2)`);

                let unreadCountIcon = document.createElement("p");
                unreadCountIcon.classList.add("unread");
                unreadCountIcon.innerHTML = await DB.getUnreadMessagesCount(chatID, Auth.currentUserID());

                if (dialogInfo.children.length > 1)
                    dialogInfo.children[1].remove(); 
                
                dialogInfo.append(unreadCountIcon);
            }
        })
    }
    
}

function addSearchInputEventListener() {
    const search = document.getElementById("search");
    const dialogList = document.getElementById("dialogList");

    const searchResult = document.getElementById("searchResult");
    const searchResultDialogs = document.getElementById("searchResultDialogs");
    const searchResultChannels = document.getElementById("searchResultChannels");
    const searchResultUsers = document.getElementById("searchResultUsers");

    search.addEventListener("input", async function(event) {
        const users = await DB.getUsersByQuery(event.target.value);
        const channels = await DB.getChannelsByQuery(event.target.value);
        const chats = [];

        for (let chat of chatsList) {
            if (chat.name.startsWith(event.target.value))
                chats.push(chat);
        }

        if (event.target.value) {
            searchResultDialogs.innerHTML = 
                (chats.length > 0) ?
                chats.map((chat) => {
                    const message = chat.lastMessage;
                    const timestamp = new Date(message.timestamp);
                    const className = (message.sender === Auth.currentUserID()) ? 
                    "last-msg-out" : "last-msg-in";

                    return `<li id="${chat.id}" class="dialog">
                                <img class="avatar" src="${chat.photoURL}" alt="Avatar">
                                <div class="dialog-info">
                                    <p class="username">${chat.name}</p>
                                    <p class="${className}">${message.content}</p>
                                </div>
                                <div class="dialog-info">
                                    <time datetime="${timestamp.toISOString()}">
                                    ${Utils.toTimeString(timestamp)}
                                    </time>
                                </div>
                            </li>`
                }).join('\n') : "";

            addDialogsClickEventListener("searchResultDialogs");

            searchResultChannels.innerHTML = 
                (channels.length > 0) ?
                channels.map(channel => 
                    `<li id="${channel.id}" class="dialog">
                        <img class="avatar" src="${channel.photoURL}" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">${channel.name}</p>
                        </div>
                    </li>`
                ).join('\n') : 
                `<p class="not-found">No channels found</p>`;

            addDialogsClickEventListener("searchResultChannels");

            searchResultUsers.innerHTML =
                (users.length > 0) ?
                users.map(user =>
                    `<li id="${user.uid}" class="dialog">
                        <img class="avatar" src="${user.photoURL}" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">${user.displayName}</p>
                        </div>
                    </li>`
                ).join('\n') :
                `<p class="not-found">No users found</p>`;

            addDialogsClickEventListener("searchResultUsers");

            dialogList.style.display = "none";
            searchResult.style.display = "block";
        } else {                
            searchResult.style.display = "none";
            dialogList.style.display = "block";
        }
    });
}

function addDialogClickEventListener(el) {
    el.addEventListener("click", async () => {
        if (activeDialog)
            activeDialog.classList.remove("active");

        activeDialog = el;
        el.classList.add("active");

        const photoURL = document.querySelector(`#${el.id} .avatar`).src;
        const name = document.querySelector(`#${el.id} .username`).innerHTML;
        Chat.setChatInfo({photoURL, name});

        if (await DB.isUserID(el.id))
            window.location.href = `#/users/${el.id}`
        else
            window.location.href = `#/channels/${el.id}`;
    });
}

function addDialogsClickEventListener(id) {
    const dialogs = document.querySelectorAll(`#${id} .dialog`);

    for (let el of dialogs) {
        addDialogClickEventListener(el);
    }
}

function updateDialogLastMessage(userID, message) {
    let lastMessageContent = document.querySelector(`#${userID} p[class^=last-msg]`);
    lastMessageContent.innerHTML = message.content;
    lastMessageContent.className = (message.sender === Auth.currentUserID()) ? "last-msg-out" :
    "last-msg-in";

    let lastMessageTime = document.querySelector(`#${userID} time`);
    const timestamp = new Date(message.timestamp);
    lastMessageTime.dateTime = timestamp.toISOString();
    lastMessageTime.innerHTML = Utils.toTimeString(timestamp);
}

export default DialogList;