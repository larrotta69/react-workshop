import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../theme/variables'
import Header from './Header'

const Layout = ({ children }) => <StyledLayout>
    <Header title="The Simpsons"/>
    {children}
</StyledLayout>

/*
    Layout Styles
*/
const StyledLayout = styled.main`
    width: 100vw;
    height: 100vh;
    background: ${colors.mainYellow};
    position: relative;
    overflow: hidden;
`
/*
    Layout propTypes
*/
Layout.propTypes = {
    children: PropTypes.node
}

export default Layout
