import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'

import Board from '../containers/Board'

import {withLayout} from '../HOC'

const Home = (props) => {
    const {params: {name}} = props.match
    return (
        <Board characterMain={name}/>
    )
}
Home.propTypes = {
    match: PropTypes.object
}

export default compose(
    withLayout
)(Home)
