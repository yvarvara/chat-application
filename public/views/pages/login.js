import Auth from "../../services/auth.js";

let Login = {
    render : async () => {
        return /*html*/`
        <main id="main-login">
            <div class="container-login">
                <img class="logo" src="images/logo.svg" alt="Logo">
                <div class="form-wrapper">
                    <form name="login" class="form-login">
                        <div class="input-wrapper"> 
                            <input type="email" placeholder=" " name="email" id="email" autofocus required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password" id="password" required>
                            <label for="password">Password</label>
                        </div>
                        <span class="error"></span>
                        <button class="form-btn" type="submit">Login</button>
                        <p>Don't have an account? <a href="#/register">Get Started</a></p>
                    </form>
                </div>
              </div>
        </main>
        `
    },

    afterRender : async () => {
        const loginForm = document.forms.login;
        const error = document.querySelector(".error");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            Auth.login(email, password).catch(err => {
                console.error(err.code);
                console.error(err.message);

                if (err.code === "auth/wrong-password" ||
                    err.code === "auth/user-not-found") {
                    error.innerHTML = "Wrong email or password";
                    error.style.display = "block";
                } else {
                    alert("An error occured");
                }
            });         
        });
    }
}

export default Login;