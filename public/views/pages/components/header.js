import Utils from "../../../services/utils.js";
import SideNav from "./sideNav.js";

let Header = {
    render : async () => {
        return /*html*/`
        <div id="menu" class="menu-icon">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <img class="logo-header" src="images/logo.svg" alt="Logo">
        `
    },

    afterRender : async () => {
        let sideNavContainer = document.getElementById("sideNav");
        Utils.render(sideNavContainer, SideNav);

        document.getElementById("menu").onclick = function toggleMenu() {
            this.classList.toggle("toggle");
            let containerMain = document.querySelector(".container-main");
        
            if (sideNavContainer.style.width == "0px" || sideNavContainer.style.width == "") {
                if (window.matchMedia("(min-width: 1200px)").matches) {
                    containerMain.style.marginLeft = "15%";
                    sideNavContainer.style.width = "15%";
                }
                else if (window.matchMedia("(min-width: 992px)").matches) {
                    containerMain.style.marginLeft = "20%";
                    sideNavContainer.style.width = "20%";
                } 
                else if (window.matchMedia("(min-width: 768px)").matches) {
                    sideNavContainer.style.width = "30%";
                } 
                else if (window.matchMedia("(min-width: 600px)").matches) {
                    sideNavContainer.style.width = "40%";
                } 
                else {
                    sideNavContainer.style.width = "100%";
                }
            }
            else {
                containerMain.style.marginLeft = "0";
                sideNavContainer.style.width = "0";
            }
        }
    }
}

export default Header;