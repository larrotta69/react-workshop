import React from 'react'
import { render } from 'react-dom'
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
    * {
        box-sizing: border-box;
    }
`)()

render(
    <Home />,
    document.getElementById('root')
)
