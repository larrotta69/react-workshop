import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Character = (props) => {
    const { src, name, posX, zIndex } = props
    return (
        <StyledCharacter posX={posX} zIndex={zIndex}>
            <img src={src} alt={name}/>
        </StyledCharacter>
    )
}
/*
    Character Styles
*/
const StyledCharacter = styled.li`
    position: absolute;
    bottom: 250px;
    transform: translateX(-30%);

    z-index: ${props => props.zIndex};
    left: ${props => `${props.posX}%`};

    img {
        width: 150px;
    }
`
/*
    Character propTypes
*/
Character.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    posX: PropTypes.string,
    zIndex: PropTypes.number
}

export default Character
