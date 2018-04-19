import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import Board from '../../containers/Board/Board'
import { withLayout } from '../../HOC'

const Home = props => {
    return (
        <Board characters={props.characters} />
    )
}

Home.propTypes = {
    characters: PropTypes.array
}

export default compose(
    withLayout
)(Home)
