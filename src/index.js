import React from 'react'
import { hydrate } from 'react-dom'
import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

// import Home from './pages/Home/Home'

// import Counter from './components/Counter'
import CounterList from './components/CounterList'

(() => injectGlobal`
    ${styledNormalize}
    ul, ol {
        list-style: none;
        padding: 0;
        left: 20%;
        right: 20%;
        top: 100%;
    }
    input {
        top: 0;
        width: 200px;
        height: 40px;
    }
    button {
        top: 0;
        color: white;
        background: #6f3b13;
        padding: 10px;
        border: none;
        left: 200px;
    }
    * {
        font-family: 'Roboto';
        box-sizing: border-box;
    }

`)()

hydrate(
    // <Home {...window.__APP_INITIAL_STATE__} />,
    <CounterList />,
    document.getElementById('root')
)
