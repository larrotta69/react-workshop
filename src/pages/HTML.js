const Html = ({ body, styles, title, initialState }) => `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title}</title>
            ${styles}
            <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        </head>
        <body style="margin:0">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${body}</div>
        </body>

        <script src="/static/main.js"></script>
    </html>
`
export default Html
