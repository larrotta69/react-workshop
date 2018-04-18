import React from 'react'
import { hydrate } from 'react-dom'

import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Home from './pages/Home/Home'

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

hydrate(
    <Home />,
    document.getElementById('root')
)
