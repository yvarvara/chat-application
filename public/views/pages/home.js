let Home = {
    render : async () => {
        return /*html*/`
        <header>
        <div id="menu" class="menu-icon">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <img class="logo-header" src="images/logo.svg" alt="Logo">
    </header>
    <main>
        <nav id="sideNav" class="side-nav">
            <button id="addPublicChannel"><i class="fa fa-unlock fa-lg"></i>New public channel</button>
            <div id="publicChannelModal" class="modal-wrapper">
                <div class="modal">
                    <button id="close_1" class="icon-btn"><i class="fa fa-times"></i></button>
                    <div class="modal-content">
                        <form class="form-modal">
                            <div class="input-wrapper"> 
                                <input type="text" placeholder=" " name="publicChannel" id="publicChannel">
                                <label for="publicChannel">Channel name</label>
                            </div>
                            <button class="form-btn" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>

            <button id="addPrivateChannel"><i class="fa fa-lock fa-lg"></i>New private channel</button>
            <div id="privateChannelModal" class="modal-wrapper">
                <div class="modal">
                    <button id="close_2" class="icon-btn"><i class="fa fa-times"></i></button>
                    <div class="modal-content">
                        <form class="form-modal">
                            <div class="input-wrapper"> 
                                <input type="text" placeholder=" " name="privateChannel" id="privateChannel">
                                <label for="privateChannel">Channel name</label>
                            </div>
                            <div class="input-wrapper">
                                <input type="password" placeholder=" " name="password" id="password">
                                <label for="password">Password</label>
                            </div>
                            <div class="input-wrapper">
                                <input type="password" placeholder=" " name="passwordConfirm" id="passwordConfirm">
                                <label for="passwordConfirm">Confirm password</label>
                            </div>
                            <button class="form-btn" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>

            <button id="openSettings"><i class="fa fa-cog fa-lg"></i>Settings</button>
            <div id="settingsModal" class="modal-wrapper">
                <div class="modal">
                    <div class="modal-header">
                        <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Dasha</p>
                        </div>
                        <button id="close_3" class="icon-btn"><i class="fa fa-times"></i></button>
                    </div>
                    <div class="modal-content">
                        <button id="editUsername"><i class="fa fa-pencil fa-lg"></i>Edit username</button>

                        <button><i class="fa fa-camera fa-lg"></i>Edit profile photo</button>
                        <div class="switch-wrapper">
                            <p><i class="fa fa-moon-o fa-lg"></i>Night mode</p>
                            <div class="toggle-switch">
                                <input type="checkbox" id="toggleSwitch"/>
                                <label for="toggleSwitch"></label>       
                            </div>    
                        </div>     
                    </div>
                </div>
            </div>

            <div id="usernameModal" class="modal-wrapper">
                <div class="modal">
                    <button id="close_4" class="icon-btn"><i class="fa fa-times"></i></button>
                    <div class="modal-content">
                        <form class="form-modal">
                            <div class="input-wrapper"> 
                                <input type="text" placeholder=" " name="username" id="username"
                                value="Dasha">
                                <label for="username">Username</label>
                            </div>
                            <button class="form-btn" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>

            <button><i class="fa fa-sign-out fa-lg"></i>Log out</button>
        </nav>
        <div class="container-main">
            <aside class="dialog-list-container">
                <div class="search-bar">
                    <div class="search-input-wrapper">
                        <i class="fa fa-search search"></i>
                        <input type="search" name="search" id="search">
                    </div>
                </div>
                <ul class="dialog-list">
                    <li class="dialog">
                        <img class="avatar" src="images/bunny.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                        </div>
                    </li>
                    <li class="dialog active">
                        <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Dasha</p>
                            <p class="last-msg-out">Bla bla bla bla        hehehehe</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-circle"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/misha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-clock-o"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/girl.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p>Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p class="unread">5</p>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/bunny.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Dasha</p>
                            <p class="last-msg-out">Bla bla bla bla        hehehehe</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-circle"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/misha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-clock-o"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/girl.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p>Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p class="unread">5</p>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/bunny.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Dasha</p>
                            <p class="last-msg-out">Bla bla bla bla        hehehehe</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-circle"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/misha.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p class="last-msg-out">Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <i class="fa fa-clock-o"></i>
                        </div>
                    </li>
                    <li class="dialog">
                        <img class="avatar" src="images/girl.jpg" alt="Avatar">
                        <div class="dialog-info">
                            <p class="username">Username</p>
                            <p>Last message</p>
                        </div>
                        <div class="dialog-info">
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p class="unread">5</p>
                        </div>
                    </li>
                </ul>
            </aside>
            <article class="chat-container">
                <div class="chat-header">
                    <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                    <div class="dialog-info">
                        <p class="username">Dasha</p>
                        <p>online</p>
                    </div>
                    <!-- <button class="icon-btn"><i class="fa fa-info-circle fa-2x"></i></button> -->
                </div>
                <ul class="chat-history">
                    <li class="msg msg-out">
                        <i class="fa fa-circle"></i>
                        <div>
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p>Bla bla bla bla        hehehehe</p>
                        </div>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>Hello hi hi woooooow hi</p>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>How
are
you?</p>
                    </li>
                    <li class="msg msg-out">
                        <div>
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p>Hellooooooo</p>
                        </div>
                    </li>
                    <li class="msg msg-out">
                        <div>
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p>Bla bla bla bla        hehehehe</p>
                        </div>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>Ich überspringe Deutschunterricht
My German language teacher disappointed in me</p>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>Hello hi hi woooooow hi</p>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>How
are
you?</p>
                    </li>
                    <li class="msg msg-out">
                        <div>
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p>Hellooooooo</p>
                        <div>
                    </li>
                    <li class="msg msg-out">
                        <div>
                            <time datetime="2020-07-24T15:44:00">15:44</time>
                            <p>Bla bla bla bla        hehehehe</p>
                        </div>
                    </li>
                    <li class="msg msg-in">
                        <time datetime="2020-07-24T15:44:00">15:44</time>
                        <p>Ich überspringe Deutschunterricht
My German language teacher disappointed in me</p>
                    </li>
                </ul>
                <div class="chat-footer">
                    <div id="new-message" contenteditable="true" placeholder="Write a message..."></div>
        
                    <button class="icon-btn"><i class="fa fa-paper-plane fa-lg"></i></button>
                    <button class="icon-btn"><i class="fa fa-smile-o fa-2x"></i></button>
                </div>
            </article>
        </div>
    </main>
        `
    },

    afterRender : async () => {
        window.onload = function() {
            document.getElementById("new-message").focus();
        };
        
        document.getElementById("menu").onclick = function toggleMenu() {
            this.classList.toggle("toggle");
        
            let sideNav = document.getElementById("sideNav");
            let containerMain = document.querySelector(".container-main");
        
            if (sideNav.style.width == "0px" || sideNav.style.width == "") {
                if (window.matchMedia("(min-width: 1200px)").matches) {
                    containerMain.style.marginLeft = "15%";
                    sideNav.style.width = "15%";
                }
                else if (window.matchMedia("(min-width: 992px)").matches) {
                    containerMain.style.marginLeft = "20%";
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
                containerMain.style.marginLeft = "0";
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
    }
}

export default Home;