import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from './src/pages/Home/Home'
import Html from './src/pages/HTML'

import { ServerStyleSheet } from 'styled-components'

const port = 3000
const server = express()

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

server.listen(port)
