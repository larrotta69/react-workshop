import React from 'react'
import {compose} from 'recompose'

import Board from '../../containers/Board/Board'

import {withLayout} from '../../HOC'

class Home extends React.Component {
    render() {
        return (
            <Board />
        )
    }
}

export default compose(
    withLayout
)(Home)
