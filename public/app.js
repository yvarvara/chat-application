import Utils from "./services/utils.js"
import Error404 from "./views/pages/error404.js"
import Register from "./views/pages/register.js"
import Login from "./views/pages/login.js"
import Home from "./views/pages/home.js"

const routes = {
    "/" : Home,
    "/login" : Login,
    "/register" : Register
};

const router = async () => {
    const content = document.getElementById("pageContent");

    let request = Utils.parseUrl();
    let parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : "");

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    await Utils.renderPage(content, page);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);