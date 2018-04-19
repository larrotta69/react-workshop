import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Character = (props) => {
    const { src, name, zIndex } = props
    return (
        <StyledCharacter
            style={{left: `${props.posX}%;`, bottom: `${250 - (props.zIndex * 5)}px;` }}
            zIndex={zIndex}>
            <img src={src} alt={name}/>
        </StyledCharacter>
    )
}
/*
    Character Styles
*/
const StyledCharacter = styled.li`
    position: absolute;
    transform: translateX(-30%);
    z-index: ${props => props.zIndex};
    transition: 1s all;

    img {
        width: 150px;
        transition: 1s all;
    }
`
/*
    Character propTypes
*/
Character.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    posX: PropTypes.number,
    zIndex: PropTypes.number,
    isMain: PropTypes.bool
}

export default Character
