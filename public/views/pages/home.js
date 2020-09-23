import Utils from "../../services/utils.js";
import Header from "../components/header.js";
import DialogList from "../components/dialogList.js"
import Chat from "../components/chat.js"
import DB from "../../services/db.js"
import Auth from "../../services/auth.js"

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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const headerContainer = document.querySelector("header");
                const dialogListContainer = document.querySelector(".dialog-list-container");
                const chatContainer = document.querySelector(".chat-container");
        
                firebase.database().ref(`users/${Auth.currentUserID()}/chats`).on("value", async function(snapshot) {
                    const chats = await DB.getUserChats(user.uid, snapshot.val());
                    dialogListContainer.innerHTML = await DialogList.render(chats);
                    await DialogList.afterRender();
                });

                Utils.render(headerContainer, Header);
                Utils.render(chatContainer, Chat);
            } else {
                window.location.href = "#/login";
            }
        });

        // window.onload = function() {
        //     document.getElementById("new-message").focus();
        // };

    }
}

export default Home;