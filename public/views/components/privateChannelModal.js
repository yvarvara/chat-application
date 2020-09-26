import Auth from "../../services/auth.js";
import DB from "../../services/db.js";
import Utils from "../../services/utils.js";

let PrivateChannelModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <button id="close_2" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form name="privateChannelForm" class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="privateChannel" id="privateChannel" required>
                        <label for="privateChannel">Channel name</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" placeholder=" " name="password" id="password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" placeholder=" " name="passwordConfirm" id="passwordConfirm" required>
                        <label for="passwordConfirm">Confirm password</label>
                    </div>
                    <span class="error"></span>
                    <button class="form-btn" type="submit">Create</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {
        const uid = Auth.currentUserID();

        const privateChannelForm = document.forms.privateChannelForm;
        const error = document.querySelector(".error");

        privateChannelForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = privateChannelForm.privateChannel.value;
            const password = privateChannelForm.password.value;
            const passwordConfirm = privateChannelForm.passwordConfirm.value;

            if (password === passwordConfirm) {
                await DB.addChannel(name, Utils.hashcode(password), [uid]);
                document.getElementById("close_2").click();
                document.getElementById("menu").click();
            } else {
                error.innerHTML = "Passwords do not match";
                error.style.display = "block";
            }
        });
    }
}

export default PrivateChannelModal;