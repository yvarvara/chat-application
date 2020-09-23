import Auth from "../../services/auth.js"
import DB from "../../services/db.js"

let UsernameModal = {
    render : async () => {
    return /*html*/`
        <div class="modal">
            <button id="close_4" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form name="usernameForm" class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="username" id="username" required>
                        <label for="username">Username</label>
                    </div>
                    <button class="form-btn" type="submit">Save</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {
        const uid = Auth.currentUserID();
        const user = await DB.getUserInfo(uid);

        const usernameInput = document.getElementById("username");
        const usernameForm = document.forms.usernameForm;

        usernameInput.value = user.displayName;

        usernameForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = usernameForm.username.value;

            DB.updateUserInfo(uid, username, user.photoURL);

            document.getElementById("usernameSettings").innerHTML = username;
            document.getElementById("close_4").click();
        });
    }
}

export default UsernameModal;