import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import {Provider} from 'react-redux'

import Home from './pages/Home'
import configureStore from './store'

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
    button {
        position: absolute;
        top: 0;
        color: white;
        background: #6f3b13;
        padding: 10px;
        border: none;
    }
    * {
        font-family: 'Roboto';
        box-sizing: border-box;
    }

`)()

const Root = ({store}) => (
    <Provider store={store}>
        <Home />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

const store = configureStore

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)
