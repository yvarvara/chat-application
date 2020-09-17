let Login = {
    render : async () => {
        return /*html*/`
        <main id="main-login">
            <div class="container-login">
                <img class="logo" src="images/logo.svg" alt="Logo">
                <div class="form-wrapper">
                    <form class="form-login">
                        <div class="input-wrapper"> 
                            <input type="email" placeholder=" " name="email" id="email" autofocus>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="password" placeholder=" " name="password" id="password">
                            <label for="password">Password</label>
                        </div>
                        <button class="form-btn" type="submit">Login</button>
                        <p>Don't have an account? <a href="#/register">Get Started</a></p>
                    </form>
                </div>
              </div>
        </main>
        `
    },

    afterRender : async () => {}
}

export default Login;