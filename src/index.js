import React from 'react'
import ReactDOM from 'react-dom'

import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Home from './pages/Home'

const GlobalStyle = createGlobalStyle`
    ${styledNormalize}
    ul, ol {
        list-style: none;
        padding: 0;
        position: absolute;
        left: 20%;
        right: 20%;
        top: 100%;
    }
    body {
        overflow: hidden;
    }
    * {
        font-family: 'Roboto';
        box-sizing: border-box;
    }
`

ReactDOM.render(
    <>
        <Home/>
        <GlobalStyle/>
    </>,
    document.getElementById('root')
)
