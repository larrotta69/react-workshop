import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Character from '../../components/Character'
import Background from '../../components/Background'

import { boardCharactersGet, boardMainCharacterUpdate } from './BoardFeatures'

class Board extends React.Component {
    state = {
        inputValue: ''
    }
    static propTypes = {
        characterMain: PropTypes.string,
        characters: PropTypes.array,
        boardCharactersGet: PropTypes.func,
        boardMainCharacterUpdate: PropTypes.func
    }

    componentDidMount() {
        this.props.boardCharactersGet()
    }
    handleClick = () => {
        const { boardMainCharacterUpdate } = this.props
        const { inputValue } = this.state
        boardMainCharacterUpdate(inputValue)
    }
    updateInputValue = (evt) => {
        this.setState({
          inputValue: evt.target.value.toLowerCase()
        })
    }
    render(){
        const { characterMain, characters } = this.props
        const { inputValue } = this.state
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

export default connect(
    ({characters, characterMain}) => ({characters, characterMain}),
    {boardCharactersGet, boardMainCharacterUpdate}
)(Board)
