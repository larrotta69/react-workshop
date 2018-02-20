import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = ({ title }) => {
    return (
        <StyledHeader>
            <img src="/logo.png" alt={title}/>
        </StyledHeader>
    )
}
/*
    Header Styles
*/
const StyledHeader = styled.header`
    text-align: center;
    padding-top: 50px;
`
/*
    Header propTypes
*/
Header.propTypes = {
    title: PropTypes.string
}

export default Header
