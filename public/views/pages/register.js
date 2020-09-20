import Auth from "../../services/auth.js"

let Register = {
    render : async () => {
        return /*html*/`
        <main id="main-login">
            <div class="container-login">
                <img class="logo" src="images/logo.svg" alt="Logo">
                <div class="form-wrapper">
                    <form name="register" class="form-login">
                        <div class="input-wrapper">
                            <input type="text" placeholder=" " name="username" id="username" autofocus required>
                            <label for="username">Username</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="email" placeholder=" " name="email" id="email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password" id="password"
                            minlength="6" required>
                            <label for="password">Password</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password_confirm" id="password_confirm"
                            minlength="6" required>
                            <label for="password_confirm">Confirm password</label>
                        </div>
                        <span class="error"></span>
                        <button class="form-btn" type="submit">Create an account</button>
                    </form>
                </div>
            </div>
        </main>
        `
    },

    afterRender : async () => {
        const registrationForm = document.forms.register;

        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = registrationForm.username.value;
            const email = registrationForm.email.value;
            const password = registrationForm.password.value;
            const passwordConfirm = registrationForm.password_confirm.value;

            const error = document.querySelector(".error");

            if (password === passwordConfirm) {
                Auth.register(username, email, password).catch(err => {
                    if (err.code === "auth/email-already-in-use") {
                        error.innerHTML = "Email already in use";
                        error.style.display = "block";
                    } else {
                        alert("An error occured");
                    }
                });
            } else {
                error.innerHTML = "Passwords do not match";
                error.style.display = "block";
            }
        });
    }
}

export default Register;