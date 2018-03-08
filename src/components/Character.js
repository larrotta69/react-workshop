import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Character = (props) => {
    const { src, name, posX, zIndex, isMain } = props
    return (
        <StyledCharacter posX={posX} zIndex={zIndex} isMain={isMain}>
            <img src={src} alt={name}/>
        </StyledCharacter>
    )
}
/*
    Character Styles
*/
const StyledCharacter = styled.li`
    position: absolute;
    transform: ${props => props.isMain ? 'translateX(-40%)' : 'translateX(-30%)'};
    z-index: ${props => props.isMain ? '100' : props.zIndex};
    transition: ${props => props.isMain ? '1s all' : 'none'};
    bottom: ${props => props.isMain ? '70px' : `${250 - (props.zIndex * 5)}px`};
    left: ${props => props.isMain ? '50%' : `${props.posX}%`};

    img {
        width: ${props => props.isMain ? '300px' : '150px'};
        transition: 1s width;
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
