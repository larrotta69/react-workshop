import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = (props) => {
    const { title } = props
    return (
        <StyledHeader>
            <h1>{title}</h1>
        </StyledHeader>
    )
}
/*
    Header Styles
*/
const StyledHeader = styled.header`
    h1 {
        margin: 0;
    }
`
/*
    Header propTypes
*/
Header.propTypes = {
    title: PropTypes.string
}

export default Header
