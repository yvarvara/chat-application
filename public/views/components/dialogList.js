import DB from "../../services/db.js"

let chatsList = null;
let activeDialog = null;

let DialogList = {
    render : async (chats) => {
        chatsList = chats;

        return /*html*/`
        <div class="search-bar">
            <div class="search-input-wrapper">
                <i class="fa fa-search search"></i>
                <input type="search" name="search" id="search">
            </div>
        </div>
        <ul id="dialogList" class="dialog-list">
            ${
                (chats && chats.length > 0) ?
                chats.map(chat => 
                    `<li id="${chat.id}" class="dialog">
                        <img class="avatar" src="${chat.photoURL}" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">${chat.name}</p>
                            <p class="last-msg-out">ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                        </div>
                    </li>`
                ).join('\n') :
                `
                <p id="notFound">No chats yet</p>
                `
                }
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
        const search = document.getElementById("search");
        const dialogList = document.getElementById("dialogList");

        const searchResult = document.getElementById("searchResult");
        const searchResultDialogs = document.getElementById("searchResultDialogs");
        const searchResultChannels = document.getElementById("searchResultChannels");
        const searchResultUsers = document.getElementById("searchResultUsers");

        addDialogsClickEventListener("#dialogList");

        search.addEventListener("input", async function(event) {
            const users = await DB.getUserByUsername(event.target.value);
            const channels = await DB.getChannelsByName(event.target.value);
            const chats = [];

            for (let chat of chatsList) {
                if (chat.name.startsWith(event.target.value))
                    chats.push(chat);
            }

            if (event.target.value) {
                searchResultDialogs.innerHTML = 
                    (chats.length > 0) ?
                    chats.map(chat => 
                        `<li id="${chat.id}" class="dialog">
                            <img class="avatar" src="${chat.photoURL}" alt="Avatar">
                            <div class="dialog-info">
                                <p class="username">${chat.name}</p>
                                <p class="last-msg-out">ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                            </div>
                            <div class="dialog-info">
                                <time datetime="2020-07-24T15:44:00">15:44</time>
                            </div>
                        </li>`
                    ).join('\n') : "";

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
                    `<p id="notFound">No channels found</p>`;

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
                    `<p id="notFound">No users found</p>`;

                addDialogsClickEventListener("#searchResult");

                dialogList.style.display = "none";
                searchResult.style.display = "block";
            } else {                
                searchResult.style.display = "none";
                dialogList.style.display = "block";
            }
        });
    }
}

function addDialogsClickEventListener(id) {
    const dialogs = document.querySelectorAll(`${id} .dialog`);

    for (let el of dialogs) {
        el.addEventListener("click", () => {
            if (activeDialog)
                activeDialog.classList.remove("active");

            activeDialog = el;
            el.classList.add("active");
        });
    }
}

export default DialogList;