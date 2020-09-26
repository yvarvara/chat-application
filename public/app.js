import Utils from "./services/utils.js"
import Error404 from "./views/pages/error404.js"
import Register from "./views/pages/register.js"
import Login from "./views/pages/login.js"
import Home from "./views/pages/home.js"
import Chat from "./views/components/chat.js"
import Auth from "./services/auth.js"
import DB from "./services/db.js"

const routes = {
    "/" : Home,
    "/login" : Login,
    "/register" : Register,
    "/channels/:id" : Chat,
    "/users/:id" : Chat
};

const router = async () => {
    let content = document.getElementById("pageContent");

    let request = Utils.parseUrl();
    let parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "");

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer && page === Chat) 
        content = chatContainer;
    
    await Utils.render(content, page);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);