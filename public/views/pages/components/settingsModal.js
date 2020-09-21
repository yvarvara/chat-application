import Auth from "../../../services/auth.js";

let SettingsModal = {
    render : async () => {
        return /*html*/`
        <div class="modal">
            <div class="modal-header">
                <img id="userAvatar" class="avatar" alt="Avatar">
                <div class="dialog-info">
                    <p id="usernameSettings" class="username"></p>
                </div>
                <button id="close_3" class="icon-btn"><i class="fa fa-times"></i></button>
            </div>
            <div class="modal-content">
                <button id="editUsername"><i class="fa fa-pencil fa-lg"></i>Edit username</button>

                <div>
                    <button id="editPhoto"><i class="fa fa-camera fa-lg"></i>Edit profile photo</button>
                    <input type="file" name="profilePhotoFile" accept="image/*" id="profilePhotoFile">
                </div>

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

    afterRender : async () => {
        const user = Auth.currentUser();
        const profilePhotoFile = document.getElementById("profilePhotoFile");
        const userAvatar = document.getElementById("userAvatar");

        userAvatar.src = user.photoURL;
        document.getElementById("usernameSettings").innerHTML = user.displayName;

        document.getElementById("editPhoto").addEventListener("click", () => {
            profilePhotoFile.click();
        })

        profilePhotoFile.addEventListener("change", () => {
            let file = profilePhotoFile.files[0];
            let filename = file.name.replace(/.*(?=\.)/, user.uid);
            console.log(filename);

            firebase.storage().ref("profile/" + filename).put(file, { contentType: file.type })
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                user.updateProfile({
                    displayName: user.displayName,
                    photoURL: url
                });
                
                userAvatar.src = url;
            })
            .catch(err => {
                console.error(err.code);
                console.error(err.message);
            })
        });
    }
}

export default SettingsModal;