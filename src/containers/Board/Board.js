import React from 'react'
import PropTypes from 'prop-types'

import Character from '../../components/Character'
import Background from '../../components/Background'

class Board extends React.Component {
    componentDidMount() {
        console.log('componentDidMount')
    }
    render(){
        const { characterMain, characters } = this.props
        const widthCharacter = characters && 93 / characters.length
        return (
            <div>
                <Background />
                <ul>
                    {characters && characters.map(character => {
                        const isMain = character.name.toLowerCase() === characterMain
                        return <Character key={`char-${character.id}`}
                            src={`https://simpsons-api.herokuapp.com/img/${character.image}`}
                            posX={character.id * widthCharacter}
                            zIndex={character.random}
                            isMain={isMain}
                        />
                    })}
                </ul>
            </div>
        )
    }
}

Board.propTypes = {
    characterMain: PropTypes.string,
    characters: PropTypes.array,
    boardCharactersGet: PropTypes.func,
    boardMainCharacterUpdate: PropTypes.func
}

export default Board
