import React from 'react'
import styled from 'styled-components'

import { colors } from '../../theme/variables'

const StyledBackground = styled.div`
    background: linear-gradient(to bottom, ${colors.mainBrown} 0%, ${colors.secondYellow} 100%);
    width: 130vw;
    height: 70vh;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20%;
`

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
            <main>
                <header>
                    <img src="/static/logo.png"/>
                    <StyledBackground />
                    hasState: {this.state.hasState}
                </header>
            </main>
        )
    }
}

export default Home
