import Utils from "../../services/utils.js";
import Header from "./components/header.js";
import DialogList from "./components/dialogList.js"
import Chat from "./components/chat.js"

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
                console.log("logged in", user);

                const headerContainer = document.querySelector("header");
                const dialogListContainer = document.querySelector(".dialog-list-container");
                const chatContainer = document.querySelector(".chat-container");
        
                Utils.render(headerContainer, Header);
                Utils.render(dialogListContainer, DialogList);
                Utils.render(chatContainer, Chat);
            } else {
                console.log("logged out");
                window.location.href = "#/login";
            }
        });

        // window.onload = function() {
        //     document.getElementById("new-message").focus();
        // };

    }
}

export default Home;