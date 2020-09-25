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

        let hours = addZero(timestamp.getHours());
        let minutes = addZero(timestamp.getMinutes());
        return hours + ":" + minutes;
    }
}

export default Utils;