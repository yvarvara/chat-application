let SettingsModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <div class="modal-header">
                <img class="avatar" src="images/dasha.jpg" alt="Avatar">
                <div class="dialog-info">
                    <p class="username">Dasha</p>
                </div>
                <button id="close_3" class="icon-btn"><i class="fa fa-times"></i></button>
            </div>
            <div class="modal-content">
                <button id="editUsername"><i class="fa fa-pencil fa-lg"></i>Edit username</button>

                <button><i class="fa fa-camera fa-lg"></i>Edit profile photo</button>
                <div class="switch-wrapper">
                    <p><i class="fa fa-moon-o fa-lg"></i>Night mode</p>
                    <div class="toggle-switch">
                        <input type="checkbox" id="toggleSwitch"/>
                        <label for="toggleSwitch"></label>       
                    </div>    
                </div>     
            </div>
        </div>
        `
    },

    afterRender : async () => {}
}

export default SettingsModal;