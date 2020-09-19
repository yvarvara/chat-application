import PublicChannelModal from "./publicChannelModal.js"
import PrivateChannelModal from "./privateChannelModal.js"
import SettingsModal from "./settingsModal.js"
import UsernameModal from "./usernameModal.js"
import Utils from "../../../services/utils.js"

let SideNav = {
    render : async () => {
        return /*html*/`
            <button id="addPublicChannel"><i class="fa fa-unlock fa-lg"></i>New public channel</button>
            <button id="addPrivateChannel"><i class="fa fa-lock fa-lg"></i>New private channel</button>
            <button id="openSettings"><i class="fa fa-cog fa-lg"></i>Settings</button>
            <button><i class="fa fa-sign-out fa-lg"></i>Log out</button>

            <div id="pubChannelModalContainer" class="modal-wrapper"></div>
            <div id="privChannelModalContainer" class="modal-wrapper"></div>
            <div id="settingsModalContainer" class="modal-wrapper"></div>
            <div id="unameModalContainer" class="modal-wrapper"></div>
        `
    },

    afterRender : async () => {
        const pubChannelModalContainer = document.getElementById("pubChannelModalContainer");
        const privChannelModalContainer = document.getElementById("privChannelModalContainer");
        const settingsModalContainer = document.getElementById("settingsModalContainer");
        const unameModalContainer = document.getElementById("unameModalContainer");

        await Utils.render(pubChannelModalContainer, PublicChannelModal);
        await Utils.render(privChannelModalContainer, PrivateChannelModal);
        await Utils.render(settingsModalContainer, SettingsModal);
        await Utils.render(unameModalContainer, UsernameModal);
     
        var openBtn1 = document.getElementById("addPublicChannel");
        var closeBtn1 = document.getElementById("close_1");
        addModal(pubChannelModalContainer, openBtn1, closeBtn1);
        
        var openBtn2 = document.getElementById("addPrivateChannel");
        var closeBtn2 = document.getElementById("close_2");
        addModal(privChannelModalContainer, openBtn2, closeBtn2);
        
        var openBtn3 = document.getElementById("openSettings");
        var closeBtn3 = document.getElementById("close_3");
        addModal(settingsModalContainer, openBtn3, closeBtn3);
        
        var openBtn4 = document.getElementById("editUsername");
        var closeBtn4 = document.getElementById("close_4");
        
        openBtn4.onclick = function() {
            settingsModalContainer.style.visibility = "hidden";
            unameModalContainer.style.display = "block";
        }
        
        closeBtn4.onclick = function() {
            unameModalContainer.style.display = "none";
            settingsModalContainer.style.visibility = "visible";
        }

        window.onclick = function(event) {
            if (event.target.className === "modal-wrapper") {
                for (let el of document.querySelectorAll(".modal-wrapper"))
                    el.style.display = "none";
            }
        };
    }
}

function addModal(modal, open_btn, close_btn) {
    open_btn.onclick = function() {
        modal.style.display = "block";
    };

    close_btn.onclick = function() {
        modal.style.display = "none";
    };
}

export default SideNav;