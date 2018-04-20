# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/third-session-start`

* Go to `react-workshop` folder
* Run `npm install`
* Then `npm start`
* Go to [localhost](http://localhost:3000/)

## Summary

* Install enzyme and jest with dependencies
* Configure the project to handle the tests
* Create our first test
* Test react component (Shallow)
* Test react component (Snapshot)
* Test react component (Mount)

# Install enzyme and jest with dependencies

run this commands on the terminal

```js
npm install --save-dev jest
npm install --save-dev enzyme
npm install --save-dev enzyme-adapter-react-16
npm install --save-dev babel-jest
```

# Configure the project to handle the tests

1. Modify the `.babelrc` file

  ```js
  {
      "presets": [["env"], "react"],
      "env": {
        "test": {
          "presets": [["env"], "react"],
          "plugins": ["transform-class-properties", "transform-object-rest-spread"]
        }
      }
  }
  ```

2. Create the jest setup file `setupJest.js` and add
  ```js
  import { configure } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  configure({ adapter: new Adapter() });
  ```

3. Create the jest configuration file `jest.config.js` on the root
  ```js
  module.exports = {
    setupFiles : ['<rootDir>/setupJest.js']
  }
  ```
4. `package.json` https://facebook.github.io/jest/docs/en/cli.html#verbose
  ```js
  "scripts": {
      ...
      "test": "jest --verbose",
  }
  ```
5. run on the cmd `npm run test`
  ```js
  No tests found
  ```

# Create our first test

1. Create a `test` folder inside the `src`
2. Inside the `src/test` folder create `Test.test.js` file https://facebook.github.io/jest/docs/en/expect.html
https://facebook.github.io/jest/docs/en/api.html
  ```js
  const sum = (a,b) => {
    return a+b
  }

  describe('Initial test', () => {
    it('Sum two different numbers, (4 + 4 = 8)', () => {

      expect(sum(4,4)).toEqual(8)
    })
  });

  ```
3. Run the command `npm run test`
  ```js
  PASS  src/test/Test.test.js
    Initial test
     ✓ Sum two different numbers, (4 + 4 = 8)
  ```

# Test a react component

1. Create `Counter.js` inside the `src/components` folder
  ```js
    import React, { Component } from 'react'

    export class Counter extends Component {

        state = {
            count: 0,
        };

        increment = () => {
            this.setState({
                count: this.state.count + 1
            });
        };

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
  ```
2. Verify the `Counter.js` component on the web, inside the `index.js` file
  ```js
  ...
  import Counter from './components/Counter'
  ...

  hydrate(
    <Counter />,
    document.getElementById('root')
  )
  ```
3. Test on web `run start`

4. Create `Counter.test.js` inside the `src/test` folder http://airbnb.io/enzyme/docs/api/
  ```js
  import React from 'react'
  import Counter from '../components/counter'

  import { shallow, mount, render } from 'enzyme'

  describe('Counter component', () => {
    it('Start with a count of 0', () => {
      const wrapper = shallow(<Counter />)

      const countState = wrapper.state().count
      expect(countState).toEqual(0)
    })
  });
    ```

5. Modify `package.json`
  ```js
    ...
    "jest": jest --verbose --watch
    ...
  ```
6. `Counter.test.js` User way http://airbnb.io/enzyme/docs/api/shallow.html
  ```js
  import React from 'react'
  import Counter from '../components/counter'

  import { shallow, mount } from 'enzyme'

  describe('Counter component', () => {
    it('Start with a count of 0', () => {
      const wrapper = shallow(<Counter />)
      const text = wrapper.find('p').text()
      expect(text).toEqual('Current count: 0')
    })
  });
    ```
7. `Counter.test.js` Simulate function http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
  ```js
  it('Can increment the count when the button is clicked', () => {
    const wrapper = shallow(<Counter />)
    const incrementBtn = wrapper.find('button')
    incrementBtn.simulate('click')
    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: 0')
  })
    ```
    ```js
      ✕ Can increment the count when the button is clicked
    ```
    ```js
      ...
      expect(text).toEqual('Current count: 1')
      ...
    ```

8. Decrement exercise
9. Refactor the `Counter.js` file
  ```js
  makeIncrement = amount => () => {
    this.setState({
        count: this.state.count + amount
    });
  }
  ```

# Test react component (Snapshot)

1. Add the dependecy https://facebook.github.io/jest/docs/en/snapshot-testing.html
  ```js
    npm install --save-dev react-test-renderer
  ```

2. Create an snapshot test
  ```js
    it('Matches the snapshot', () => {
      const tree = renderer.create(<Counter />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  ```

3. Look the snapshot file created in `src/test/__snapshots__`

4.  Modify the `Counter.js` file
  ```js
    ...
      <p>Current 2 count: {this.state.count}</p>
    ...
  ```
What happen in the console ?


# Test react component

1. Create a component `CounterList.js` component
  ```js
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
  ```
2. Remove the `position: absolute` properties on the `src/index.js`

3. Test on the browser `run start`

4. Create the `CounterList.test.js` inside the `src/test` folder
  ```js
  import React from 'react'
  import CounterList from '../components/CounterList';
  import { shallow, mount } from 'enzyme';

  describe('CounterList component', () => {
    it ('Test', () =>{
      const shallowWrapper = shallow(<CounterList />)
      const mountWrapper = mount(<CounterList />)

      console.log(shallowWrapper.debug());
      console.log(mountWrapper.debug());
    })
  });
  ```
What happen on the console ?

5. Render two counters by default

  ```js
  ...
  it('Should render two counters by default', () => {
    const wrapper = shallow(<CounterList/>);
    const counters = wrapper.find('Counter');

    expect(counters.length).toEqual(2);
  })
  ...
  ```

6. Add a new counter

  ```js
  ...
    it('Can add more counters by clicking the button', () => {
      const wrapper = shallow(<CounterList/>);
      const btn = wrapper.find('button');
      btn.simulate('click');

      const counters = wrapper.find('Counter');

      expect(counters.length).toEqual(3);
    })
  ...
  ```

# Last but not least

* https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913
* https://github.com/jsdom/jsdom
