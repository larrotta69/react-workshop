import React from 'react'
import {compose} from 'recompose'

import Board from '../../containers/Board/Board'

import {withLayout} from '../../HOC'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasState: 'no'
        }
    }

    componentDidMount(){
        console.log('componentDidMount')

        setTimeout(() => {
            this.setState({
                hasState: 'yes updated'
            })
        }, 1000)
    }

    render() {
        return (
            <Board />
        )
    }
}

export default compose(
    withLayout
)(Home)
