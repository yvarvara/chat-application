let PrivateChannelModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <button id="close_2" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="privateChannel" id="privateChannel">
                        <label for="privateChannel">Channel name</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" placeholder=" " name="password" id="password">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" placeholder=" " name="passwordConfirm" id="passwordConfirm">
                        <label for="passwordConfirm">Confirm password</label>
                    </div>
                    <button class="form-btn" type="submit">Create</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {}
}

export default PrivateChannelModal;