import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Home from './pages/Home'

(() => injectGlobal`
    ${styledNormalize}
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

`)()

const RouterApp = () => (
    <Switch>
        <Route exact path='/:name' component={Home} />
    </Switch>
)

ReactDOM.render(
    <Router>
        <RouterApp />
    </Router>,
    document.getElementById('root')
)
