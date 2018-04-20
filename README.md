# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/third-session-start`
* Go to `react-workshop` folder
* Run `npm install`
* Then `npm start`
* Go to [localhost](http://localhost:3000/)

## First round

* Add client scripts to build production bundle
* Create Express, then serve a simple html `dist/index.html`
* Compile server from Webpack
* Create HTML wrapper as a template

#### Let's code

##### Scripts to build:

`/package.json`

```js
"scripts": {
	"start:client": "react-scripts start",
	"build:client": "react-scripts build",
	"copy-assets": "mkdir -p ./dist/static && cp ./build/static/js/*.js ./dist/static/main.js && cp ./public/logo.png ./dist/static && cp ./public/index.html ./dist/static",
	"prestart": "npm run build:client && npm run copy-assets",
	"start": "nodemon server.js"
},

```
> Run npm start


##### Express server:

`/server.js`

```js
var express = require('express')
var app = express()
const path = require('path')

app.set('port', (process.env.PORT || 3000))
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/static', 'index.html'))
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})

```

##### Compile server from webpack:

`/webpack.config.js`

```js
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/'
    },
    target: 'node',
    externals: nodeExternals(),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production',
                PORT: process.env.PORT || 3000
            }
        })
    ]
}

```

##### Serving HTML as a template:

`/server.js`

```js
import express from 'express'

import Html from './src/pages/HTML'

const server = express()
server.set('port', (process.env.PORT || 3000)) // eslint-disable-line
server.use('/static', express.static('./dist/static'))

server.get('/', (req, res) => {
    const title = 'Server side Rendering'
	const body = `HMTL from Server side Rendering`
    res.send(Html({
        body,
        title
    }))
})

server.listen(server.get('port'), () => {
    console.log('Node server is running on port', server.get('port'))
})

```

##### Compile server:

`/package.json`

```js
"start": "npm run build && node ./dist/server.js",
"build": "webpack"
```

##### HTML template:

`/src/pages/HTML.js`

```jsx
const Html = ({ body, title }) => `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title}</title>
            <style>
                ul, ol {
                    list-style: none;
                    padding: 0;
                    position: absolute;
                    left: 20%;
                    right: 20%;
                    top: 100%;
                }
                * {
                    font-family: 'Roboto';
                    box-sizing: border-box;
                }
            </style>
        </head>
        <body style="margin:0">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${body}</div>
        </body>
    </html>
`
export default Html
```
> Change "/static/logo.png"

> Run npm start

> Test by adding < script src="/static/main.js"></script> to our HTML


## Second round

* Render a simple string from `<Home />` with `renderToString`
* Change `render` method to `hydrate`
* Add styles from our `styled-components`
* Change API request from client to server


#### Let's code

##### Render from renderToString:
`/src/pages/Home/Home.js`

```js
return (
    <p>Rendering HomePage From Server</p>
)
```

`/server.js`

```js
import React from 'react'

import { renderToString } from 'react-dom/server'

import Home from './src/pages/Home/Home'

...
const body = renderToString(<Home />)

```
> Bummmmmmm! ERROR!!! we need webpack


##### Webpack to support react:

`/webpack.config.js`

```js
...
module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-2'],
                plugins: ['transform-class-properties']
            }
        }
    ]
}

```

##### Hydrate method:

`/src/index.js`

```js
import { hydrate } from 'react-dom'
...
hydrate(
    <Home />,
    document.getElementById('root')
)
```
> Remove globalStyles from here

##### Server styled-components:

`/server.js`

```js
import { ServerStyleSheet } from 'styled-components'
...
const sheet = new ServerStyleSheet()
const body = renderToString(sheet.collectStyles(<Home />))
const styles = sheet.getStyleTags()
res.send(Html({
    body,
    styles,
    title
}))

```

`/src/pages/HTML.js`

```js
const Html = ({ body, styles, title }) => `
...
${styles}

```
> Inspect to look at the styles

##### Server API request:

`/server.js`

```js
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

```


`/src/pages/Home/Home.js`

```js
const Home = props => {
    return (
        <Board characters={props.characters} />
    )
}
```

`/src/containers/Board/Board.js`

```js
componentDidMount() {
    console.log('componentDidMount')
}
...
const { characterMain, characters } = this.props
```
> Remove unused dependencies and variables

`/src/pages/HTML.js`

```js
const Html = ({ body, styles, title, initialState }) => `
...
<script>window.__APP_INITIAL_STATE__ = ${initialState}</script>

```
`/src/index.js`

```js
hydrate(
    <Home {...window.__APP_INITIAL_STATE__} />,
    document.getElementById('root')
)

```
