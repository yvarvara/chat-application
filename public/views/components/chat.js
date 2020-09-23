let Chat = {
    render : async () => {
        return /*html*/`
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
        `
    },

    afterRender : async () => {}
}

export default Chat;