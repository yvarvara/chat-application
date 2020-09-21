import Auth from "../../../services/auth.js";

let UsernameModal = {
    render : async () => {
    return /*html*/`
        <div class="modal">
            <button id="close_4" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form name="usernameForm" class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="username" id="username">
                        <label for="username">Username</label>
                    </div>
                    <span class="error"></span>
                    <button class="form-btn" type="submit">Save</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {
        const user = Auth.currentUser();
        const usernameInput = document.getElementById("username");
        const usernameForm = document.forms.usernameForm;
        const error = document.querySelector(".error");

        usernameInput.value = user.displayName;

        usernameForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = usernameForm.username.value;

            if (username) {
                user.updateProfile({
                    displayName: username,
                    photoURL: user.photoURL
                })
                .catch(err => {
                    console.error(err.code);
                    console.error(err.message);
                });

                document.getElementById("usernameSettings").innerHTML = username;
                document.getElementById("close_4").click();
            } else {
                error.innerHTML = "Username cannot be empty";
                error.style.display = "block";
            }      
        });
    }
}

export default UsernameModal;