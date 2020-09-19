let UsernameModal = {
    render : async () => {
    return /*html*/`
        <div class="modal">
            <button id="close_4" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="username" id="username"
                        value="Dasha">
                        <label for="username">Username</label>
                    </div>
                    <button class="form-btn" type="submit">Save</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {}
}

export default UsernameModal;