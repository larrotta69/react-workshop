import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'

import Board from '../containers/Board/Board'

import {withLayout} from '../HOC'

const Home = () => {
    return (
        <Board />
    )
}
Home.propTypes = {
    match: PropTypes.object
}

export default compose(
    withLayout
)(Home)
