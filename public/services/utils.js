import Auth from "./auth.js";

const Utils = {
    parseUrl: () => {
        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource: null,
            id: null
        }
        request.resource = r[1];
        request.id = r[2];

        return request;
    },

    render: async (container, content) => {
        container.innerHTML = await content.render();
        await content.afterRender();
    },

    toTimeString: (timestamp) => {
        function addZero(n) {
            return (n < 10) ? "0" + n : n;
        }

        const dayMillis = 60 * 60 * 24 * 1000;

        if (timestamp.getTime() + dayMillis < Date.now()) {
          let day = addZero(timestamp.getDate());
          let month = addZero(timestamp.getMonth() + 1);
          let year = timestamp.getFullYear().toString().substring(2, 4);
          return day + "." + month + "." + year;
        }
    
        let hours = addZero(timestamp.getHours());
        let minutes = addZero(timestamp.getMinutes());
        return hours + ":" + minutes;
    },

    getTwoUsersChatID: (userA, userB) => {
        return (userA > userB) ? (userA + userB) : (userB + userA);
    },

    getChatPeerID: (chatID) => {
        return chatID.replace(Auth.currentUserID(), "");
    },

    hashcode: (s) => {
        for(var i = 0, h = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    
        return h;
    }
}

export default Utils;