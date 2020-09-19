let PublicChannelModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <button id="close_1" class="icon-btn"><i class="fa fa-times"></i></button>
            <div class="modal-content">
                <form class="form-modal">
                    <div class="input-wrapper"> 
                        <input type="text" placeholder=" " name="publicChannel" id="publicChannel">
                        <label for="publicChannel">Channel name</label>
                    </div>
                    <button class="form-btn" type="submit">Create</button>
                </form>
            </div>
        </div>
        `
    },

    afterRender : async () => {}
}

export default PublicChannelModal;