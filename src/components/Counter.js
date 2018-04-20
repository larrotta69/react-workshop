import React, { Component } from 'react'

export class Counter extends Component {

    state = {
        count: 0,
    };

    makeIncrement = amount => () =>
      this.setState({
          count: this.state.count + amount
      });


    increment = this.makeIncrement(1)

    render() {
      return (
          <div>
          <p>Current count: {this.state.count}</p>
          <button onClick={this.increment}>Increment count</button>
          </div>
      )
    }
}

export default Counter
