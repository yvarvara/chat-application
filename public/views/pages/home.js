import Utils from "../../services/utils.js";
import Header from "../components/header.js";
import DialogList from "../components/dialogList.js"
import Chat from "../components/chat.js"
import DB from "../../services/db.js"

let Home = {
    render : async () => {
        return /*html*/`
        <header>
        </header>
        <main>
            <nav id="sideNav" class="side-nav">
            </nav>
            <div class="container-main">
                <aside class="dialog-list-container">
                </aside>
                <article class="chat-container">
                </article>
            </div>
        </main>
        `
    },

    afterRender : async () => {
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                const headerContainer = document.querySelector("header");
                const dialogListContainer = document.querySelector(".dialog-list-container");
                const chatContainer = document.querySelector(".chat-container");

                Utils.render(headerContainer, Header);
                Utils.render(chatContainer, Chat);
                Utils.render(dialogListContainer, DialogList);

                let init = false;
                DB.addUserChatsChildAddedListener(async function(snapshot) {
                    if (!init)
                        return;

                    const chatID = snapshot.key;
                    const chat = await DB.getChatInfoById(chatID);
                    chat.id = chatID;
                    chat.lastMessage = await DB.getChatLastMessage(chatID);

                    await DialogList.renderNewChat(chat);       
                    await DialogList.afterNewChatRender(chatID);      
                });

                new Promise(async(resolve, reject) => {
                    let chats = await DB.getCurrentUserChats();
                    chats.forEach(async (chat) => {
                        await DialogList.renderNewChat(chat);       
                        await DialogList.afterNewChatRender(chat.id);
                    });
                    resolve(100);
                }).then(() => {
                    init = true;
                });


            } else {
                window.location.href = "#/login";
            }
        });
    }
}

export default Home;