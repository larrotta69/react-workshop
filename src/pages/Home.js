import React from 'react'
import PropTypes from 'prop-types'

import Board from '../containers/Board'
import Layout from '../components/Layout'

const Home = (props) => {
    const {params: {name}} = props.match
    return (
        <Layout>
            <Board characterMain={name}/>
        </Layout>
    )
}
Home.propTypes = {
    match: PropTypes.object
}

export default Home
