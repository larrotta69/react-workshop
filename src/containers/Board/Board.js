import React from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import Character from '../../components/Character'
import Background from '../../components/Background'

// import { boardCharactersGet, boardMainCharacterUpdate } from './BoardFeatures'
const serverUrl = 'https://simpsons-api.herokuapp.com/characters'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            characters: null
        }
    }

    componentDidMount() {
        // this.props.boardCharactersGet()
        axios.get(serverUrl)
            .then(response => {
                const { length } = response.data
                const characterWithRandom = response.data.map((character) => {
                    return {...character, random: Math.floor(Math.random() * length)}
                })
                this.setState({
                    characters: characterWithRandom
                })
            })
            .catch(error => {
                throw new Error(error)
            })
    }
    handleClick = () => {
        // const { boardMainCharacterUpdate } = this.props
        // const { inputValue } = this.state
        // boardMainCharacterUpdate(inputValue)
        console.log('click')
    }
    updateInputValue = (evt) => {
        this.setState({
          inputValue: evt.target.value.toLowerCase()
        })
    }
    render(){
        const { characterMain } = this.props
        const { inputValue, characters } = this.state
        const widthCharacter = characters && 93 / characters.length
        return (
            <div>
                <Background />
                <input value={inputValue} onChange={this.updateInputValue}/>
                <button onClick={this.handleClick}>Set Main</button>
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
