import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import Character from '../components/Character'
import Background from '../components/Background'

class Board extends React.Component {
    state = {
        characters: null
    }

    static propTypes = {
        characterMain: PropTypes.string
    }

    componentDidMount() {
        axios.get('https://simpsons-api.herokuapp.com/characters')
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
        .catch(error => {
            throw new Error(error)
        })
    }
    render(){
        const { characterMain } = this.props
        const { characters } = this.state
        const widthCharacter = characters && 93 / characters.length
        return (
            <div>
                <Background />
                <ul>
                    {characters && characters.map(character => {
                        const zIndex = characters && Math.floor(Math.random() * characters.length)
                        const isMain = character.name.toLowerCase() === characterMain
                        return <Character key={`char-${character.id}`}
                            src={`https://simpsons-api.herokuapp.com/img/${character.image}`}
                            posX={character.id * widthCharacter}
                            zIndex={zIndex}
                            isMain={isMain}
                        />
                    })}
                </ul>
            </div>
        )
    }
}

export default Board
