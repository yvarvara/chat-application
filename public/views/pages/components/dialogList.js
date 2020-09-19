let DialogList = {
    render : async () => {
        return /*html*/`
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
        `
    },

    afterRender : async () => {}
}

export default DialogList;