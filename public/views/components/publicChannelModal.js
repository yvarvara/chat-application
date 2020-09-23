import Auth from "../../services/auth.js";
import DB from "../../services/db.js";

let PublicChannelModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <button id="close_1" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form name="publicChannelForm" class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="publicChannel" id="publicChannel" required>
                        <label for="publicChannel">Channel name</label>
                    </div>
                    <button class="form-btn" type="submit">Create</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {
        const uid = Auth.currentUserID();
        const publicChannelForm = document.forms.publicChannelForm;

        publicChannelForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = publicChannelForm.publicChannel.value;
            await DB.addChannel(name, null, [uid]);
            document.getElementById("close_1").click();
            document.getElementById("menu").click();
        });
    }
}

export default PublicChannelModal;