import Utils from "../../services/utils.js";
import DB from "../../services/db.js";
import Auth from "../../services/auth.js";

let request = null;
let chatID = null;
let chat = null;
let messages = null;
let chatHistory = null;
let chatExists = false;

let Chat = {
    render : async () => {
        request = Utils.parseUrl();
        if (!request.resource) {
            return `<p class="chat-not-selected">Select a chat</p>`
        }

        let chatMessages = "";
        chatID = request.id;

        if (request.resource === "users") {
            chatExists = await DB.isUserInCurrentUserChats(chatID);
            chatID = Utils.getTwoUsersChatID(chatID, Auth.currentUserID());
        } else if (request.resource === "channels") {
            chatExists = await DB.isChannelInCurrentUserChats(chatID);
        }

        if (chatExists) {
            messages = await DB.getMessages(chatID);
            const uid = Auth.currentUserID();

            for (let id in messages) {
                const content = messages[id].content;
                const timestamp = new Date(messages[id].timestamp);
                const time = Utils.toTimeString(timestamp);
                const datetime = timestamp.toISOString();
                
                const senderName = (await DB.getUserInfo(messages[id].sender)).displayName;

                const messageHTML = (messages[id].sender === uid) ?
                `<li class="msg msg-out">
                    <div>
                        <time datetime="${datetime}">
                            ${time}
                        </time>
                        <p>${content}</p>
                    </div>
                </li>` : (request.resource === "channels") ?
                `<li class="msg msg-in">
                    <p class="sender">${senderName}</p>
                    <time datetime="${datetime}">
                        ${time}
                    </time>
                    <p>${content}</p>
                </li>` :
                `<li class="msg msg-in">
                    <time datetime="${datetime}">
                        ${time}
                    </time>
                    <p>${content}</p>
                </li>`;
    
                chatMessages = messageHTML + '\n' + chatMessages;
            }
        }

        return /*html*/`
        <div class="chat-header">
            <img class="avatar" src="${chat.photoURL}" alt="Avatar">
            <div class="dialog-info">
                <p class="username">${chat.name}</p>
                <p id="connState"></p>
            </div>
            <!-- <button class="icon-btn"><i class="fa fa-info-circle fa-2x"></i></button> -->
        </div>
        <ul class="chat-history">
            ${chatMessages}
        </ul>
        <div class="chat-footer">
            <form name="newMessage">
                <div id="new-message" contenteditable="true" placeholder="Write a message..."></div>
                <button class="icon-btn" type="submit"><i class="fa fa-paper-plane fa-lg"></i></button>
                <button class="icon-btn"><i class="fa fa-smile-o fa-2x"></i></button>
            <form>
        </div>
        `
    },

    afterRender : async () => {
        chatHistory = document.querySelector(".chat-history");

        const newMessageForm = document.forms.newMessage;
        if (!newMessageForm)
            return;

        if (request.resource === "users")
            await DB.getConnentionState(request.id);

        newMessageForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const newMessageField = document.getElementById("new-message");
            const messageContent = newMessageField.innerText;

            if (messageContent) {
                newMessageField.innerHTML = "";

                if (!chatExists) {
                    if (request.resource === "users") {
                        await DB.addChat(request.id, Auth.currentUserID());
                    } else if (request.resource === "channels") {
                        await DB.addChannelMember(Auth.currentUserID(), chatID);
                    }
                }

                const timestamp = new Date();
                const msgRef = await DB.getNewMessageRef(chatID);

                DB.addMessage(msgRef, chatID, Auth.currentUserID(), messageContent, timestamp.getTime())
                .then((snap) => {
                    let i = document.querySelector(`li[id="${snap}"] i.fa-clock-o`);
                    if (i) 
                        i.className = "fa fa-circle";
                });

                let message = document.createElement("li");
                message.id = msgRef.key;
                message.classList.add("msg", "msg-out");

                message.innerHTML = `
                <i class="fa fa-clock-o"></i>
                <div>
                    <time datetime="${timestamp.toISOString()}">${Utils.toTimeString(timestamp)}</time>
                    <p>${messageContent}</p>
                </div>
                `;

                chatHistory.prepend(message);
            }  
        });

        if (chatID) {
            const message = await DB.getChatLastMessage(chatID);

            if (message)
                await DB.updateLastReadMessage(chatID, message);

            let count = (request.resource === "users") ? 
            await DB.getUnreadMessagesCount(chatID, request.id) : 
            await DB.getUnreadMessagesCountChannel(chatID);

            Chat.addMessageStatusIcons(count);
        }
    },

    renderNewMessage: async (msg) => {
        if (!chatHistory)
            return;

        const timestamp = new Date(msg.timestamp);
        const senderName = (await DB.getUserInfo(msg.sender)).displayName;

        let message = document.createElement("li");
        message.classList.add("msg", "msg-in");

        message.innerHTML = (request.resource === "users") ? `
            <time datetime="${timestamp.toISOString()}">
                ${Utils.toTimeString(timestamp)}
            </time>
            <p>${msg.content}</p>` :
            `<p class="sender">${senderName}</p>
            <time datetime="${datetime}">
                ${time}
            </time>
            <p>${content}</p>
        `;

        chatHistory.prepend(message);
    },
    
    setChatInfo: (chatInfo) => {
        chat = chatInfo;
    },

    addMessageStatusIcons: (count) => {
        let icon = document.createElement("i");
        icon.classList.add("fa", "fa-circle");

        document.querySelectorAll(`.msg-out:nth-of-type(-n + ${count})`).forEach(li =>
            li.prepend(icon.cloneNode())
        );
    },

    removeMessageStatusIcons: () => {
        document.querySelectorAll(`.msg i.fa`).forEach(i => i.remove());
    }
}

export default Chat;