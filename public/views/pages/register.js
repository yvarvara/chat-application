let Register = {
    render : async () => {
        return /*html*/`
        <main id="main-login">
            <div class="container-login">
                <img class="logo" src="images/logo.svg" alt="Logo">
                <div class="form-wrapper">
                    <form class="form-login">
                        <div class="input-wrapper">
                            <input type="text" placeholder=" " name="username" id="username" autofocus>
                            <label for="username">Username</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="email" placeholder=" " name="email" id="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password" id="password">
                            <label for="password">Password</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password_confirm" id="password_confirm">
                            <label for="password_confirm">Confirm password</label>
                        </div>
                        <button class="form-btn" type="submit">Create an account</button>
                    </form>
                </div>
            </div>
        </main>
        `
    },

    afterRender : async () => {}
}

export default Register;