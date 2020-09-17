let Error404 = {
    render : async () => {
        return /*html*/`
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
        `
    },

    afterRender : async () => {}
}

export default Error404;