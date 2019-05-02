import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import Character from '../components/Character'
import Background from '../components/Background'

class Board extends React.Component {
    state = {
        characters: []
    }

    static propTypes = {
        characterMain: PropTypes.string
    }

    componentDidMount() {
        axios.get('https://simpsons-api.herokuapp.com/characters')
        .then(response => {
            const { length } = response.data
            const characters = response.data.map(c => ({ ...c, random: Math.floor(Math.random() * length)}))
            this.setState({
                characters
            })
        })
        .catch(error => {
            throw new Error(error)
        })
    }
    render(){
        const { characterMain } = this.props
        const { characters } = this.state
        const { length } = characters
        const widthCharacter = characters && 93 / length
        return <div>
            <Background />
            <ul>
                {length && characters.map(character => {
                    const { id, image, random } = character
                    const isMain = character.name.toLowerCase() === characterMain
                    return <Character key={`char-${random}-${id}`}
                        src={`https://simpsons-api.herokuapp.com/img/${image}`}
                        posX={id * widthCharacter}
                        zIndex={random}
                        isMain={isMain}
                    />
                })}
            </ul>
        </div>
    }
}

export default Board
