window.onload = function() {
    document.getElementById("new-message").focus();
};

document.getElementById("menu").onclick = function toggleMenu() {
    this.classList.toggle("toggle");

    let sideNav = document.getElementById("sideNav");
    let main = document.getElementById("main");

    if (sideNav.style.width == "0px" || sideNav.style.width == "") {
        if (window.matchMedia("(min-width: 1200px)").matches) {
            main.style.marginLeft = "15%";
            sideNav.style.width = "15%";
        }
        else if (window.matchMedia("(min-width: 992px)").matches) {
            main.style.marginLeft = "20%";
            sideNav.style.width = "20%";
        } 
        else if (window.matchMedia("(min-width: 768px)").matches) {
            sideNav.style.width = "30%";
        } 
        else if (window.matchMedia("(min-width: 600px)").matches) {
            sideNav.style.width = "40%";
        } 
        else {
            sideNav.style.width = "100%";
        }
    }
    else {
        main.style.marginLeft = "0";
        sideNav.style.width = "0";
    }
}

function addModal(modal, open_btn, close_btn) {
    open_btn.onclick = function() {
        modal.style.display = "block";
    };

    close_btn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target.className === modal.className) {
            modal.style.display = "none";
        }
    };
}

var publicChannelModal = document.getElementById("publicChannelModal");
var openBtn1 = document.getElementById("addPublicChannel");
var closeBtn1 = document.getElementById("close_1");
addModal(publicChannelModal, openBtn1, closeBtn1);

var privateChannelModal = document.getElementById("privateChannelModal");
var openBtn2 = document.getElementById("addPrivateChannel");
var closeBtn2 = document.getElementById("close_2");
addModal(privateChannelModal, openBtn2, closeBtn2);

var settingsModal = document.getElementById("settingsModal");
var openBtn3 = document.getElementById("openSettings");
var closeBtn3 = document.getElementById("close_3");
addModal(settingsModal, openBtn3, closeBtn3);

var usernameModal = document.getElementById("usernameModal");
var openBtn4 = document.getElementById("editUsername");
var closeBtn4 = document.getElementById("close_4");

openBtn4.onclick = function() {
    settingsModal.style.visibility = "hidden";
    usernameModal.style.display = "block";
}

closeBtn4.onclick = function() {
    usernameModal.style.display = "none";
    settingsModal.style.visibility = "visible";
}