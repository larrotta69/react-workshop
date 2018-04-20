import React, { Component } from 'react'

import Counter from './Counter';

const createRange = num => Array.from(Array(num).keys());

export class CounterList extends Component {

    state = {
        numCounter: 2
    }

    addCounter = () => {
        this.setState( prevState => {
            return {
                numCounter: prevState.numCounter + 1
            }
        })
    }

    renderCounter = (index) => {
        return (
            <li key={index}>
                <Counter />
            </li>
        )
    }

    render() {
        const countersArray = createRange(this.state.numCounter);

        return (
        <div>
            <button onClick={this.addCounter}>Add counter</button>
            <ul>
                {countersArray.map(num => this.renderCounter(num))}
            </ul>
        </div>
        )
    }
}

export default CounterList
