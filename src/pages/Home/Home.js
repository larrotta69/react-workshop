import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Home extends React.Component {
    componentDidMount() {
        axios.get('https://simpsons-api.herokuapp.com/characters')
        .then(response => {
            console.log(response.dataº)
            return response.data
        })
        .catch(error => {
            throw new Error(error)
        })
    }
    render () {
        return (
            <main>
                <header>
                    <h1>The Simpsons</h1>
                </header>
            </main>
        )
    }
}
/*
    Home propTypes
*/
Home.propTypes = {
    // : PropTypes.
}

export default Home
