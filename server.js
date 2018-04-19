import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import App from './src/pages/Home/Home'
import Html from './src/pages/HTML'

const server = express()
server.set('port', (process.env.PORT || 3000)) // eslint-disable-line
server.use('/static', express.static('./dist/static'))
server.get('/', (req, res) => {
    const sheet = new ServerStyleSheet()
    const body = renderToString(sheet.collectStyles(<App />))
    const title = 'Server side Rendering'
    const styles = sheet.getStyleTags()

    res.send(Html({
        body,
        styles,
        title
    }))
})
server.listen(server.get('port'), () => {
    console.log('Node server is running on port', server.get('port'))
})
