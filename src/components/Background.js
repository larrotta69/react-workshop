import React from 'react'
import styled from 'styled-components'

import { colors } from '../theme/variables'

const Background = () => <StyledBackground />
/*
    Background Styles
*/
const StyledBackground = styled.div`
    background: linear-gradient(to bottom, ${colors.mainBrown} 0%, ${colors.secondYellow} 100%);
    width: 130vw;
    height: 70vh;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20%;
`

export default Background
