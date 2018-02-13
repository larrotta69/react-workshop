import React from 'react'
import axios from 'axios'

import Character from '../components/Character'
import Background from '../components/Background'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: null
        }
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
        const { characters } = this.state
        const widthCharacter = characters && 90 / characters.length

        return (
            <div>
                <Background />
                <ul>
                    {characters && characters.map(character => {
                        const zIndex = characters && Math.floor(Math.random() * characters.length)
                        return <Character key={`char-${character.id}`}
                            src={`https://simpsons-api.herokuapp.com/img/${character.image}`}
                            posX={`${character.id * widthCharacter}`}
                            zIndex={zIndex}
                        />
                    })}
                </ul>
            </div>
        )
    }
}

export default Board
