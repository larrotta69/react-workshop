import express from 'express'
import React from 'react'
import axios from 'axios'

import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import Home from './src/pages/Home/Home'
import Html from './src/pages/HTML'

const serverUrl = 'https://simpsons-api.herokuapp.com/characters'

const App = React.createFactory(class extends React.Component {
    render () {
        return <Home {...this.props} />
    }
})

const server = express()
server.set('port', (process.env.PORT || 3000)) // eslint-disable-line
server.use('/static', express.static('./dist/static'))

server.get('/', (req, res) => {
    const title = 'Server side Rendering'
    const sheet = new ServerStyleSheet()

    axios.get(serverUrl)
    .then(response => {
        const { length } = response.data
        const characterWithRandom = response.data.map((character) => {
            return {...character, random: Math.floor(Math.random() * length)}
        })
        const initialState = { characters: characterWithRandom }
        const body = renderToString(sheet.collectStyles(App(initialState)))
        const styles = sheet.getStyleTags()
        res.send(Html({
            body,
            styles,
            title,
            initialState: JSON.stringify(initialState)
        }))
    })
    .catch(error => {
        throw new Error(error)
    })
})

server.listen(server.get('port'), () => {
    console.log('Node server is running on port', server.get('port'))
})
