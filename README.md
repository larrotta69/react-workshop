# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/first-session-start`

* Go to `react-workshop` folder
* Run `yarn install`
* Then `yarn start`
* Go to [localhost](http://localhost:3000/)

## First round

* Create React App
* JSX
* Composition
* Props

#### Let's code

##### JSX - Composition:

`/pages/Home.js`

```jsx
import Board from '../containers/Board'

const Home = () => <Board characterMain="Homer Simpson"/>
```

##### Props:

`/containers/Board.js`

```jsx
const Board = ({characterMain}) =>
    <div>
        <h1>{characterMain}</h1>
    </div>

Board.propTypes = {
    characterMain: PropTypes.string
}
```

> Try a different data type as props: `<Board characterMain={['Homer', 'Simpson']}/>`

#### Adding Background component


```js
<Background />
<h1>{characterMain}</h1>
```
## Second round

* Styled Components
* Ways of writing [Components](https://medium.com/@the.benhawy/3-ways-to-create-react-components-8b3620e4ea0)
* State
* Event Handlers

#### Let's code

##### Styled Components:

`/components/Background.js`
> Take a look at: `<Background />` and `StyledBackground`

##### State:

`/containers/Board.js`

```jsx
class Board extends React.Component {
    state = {
        characters: ['Marge', 'Bart', 'Lisa']
    }
    render(){
	    const { characterMain } = this.props
	    const { characters } = this.state
	    return <div>
	        <Background />
	        <h1>{characterMain}</h1>
	        {characters.map(character => <div key={`char-${character}`}>{character}</div>)}
	    </div>
    }
}
```
##### Event Handlers:

```js
<button onClick={this.setNewCharacters}>set new characters</button>
```
```js
setNewCharacters = () => {
	this.setState({
		characters: ['Seymour', 'Willie', 'Moe', 'Ralph']
	})
}
```
##### Passing arguments:

```js
<button onClick={() => this.setNewCharacters(['Seymour', 'Willie', 'Moe', 'Ralph'])}>set new characters</button>
```
> Tip: currying

```js
setNewCharacters = characters => () => {
    this.setState({
        characters
    })
}
```

## Third round

* Lifecycle [link](https://rangle.github.io/react-training/react-lifecycles/)
* Router
* High order components

#### Let's code

##### Lifecycle:

`/components/Character.js` [file](https://github.com/larrotta69/react-workshop/blob/first-session/src/components/Character.js)

```jsx
const Character = ({ src, name, posX, zIndex, isMain }) => {
    return <StyledCharacter posX={posX} zIndex={zIndex} isMain={isMain}>
        <img src={src} alt={name}/>
    </StyledCharacter>
}
/*
    Character Styles
*/
const StyledCharacter = styled.li`
    position: absolute;
    transform: ${props => props.isMain ? 'translateX(-40%)' : 'translateX(-30%)'};
    z-index: ${props => props.isMain ? '100' : props.zIndex};
    bottom: ${props => props.isMain ? '70px' : `${250 - (props.zIndex * 5)}px`};
    left: ${props => props.isMain ? '50%' : `${props.posX}%`};
    img {
        width: ${props => props.isMain ? '300px' : '150px'};
    }
`
```

`/containers/Board.js`

```js
state = {
    characters: []
}
    
componentDidMount() {
    axios.get('https://simpsons-api.herokuapp.com/characters')
    .then(response => {
        const { length } = response.data
        const characters = response.data.map(c => ({ ...c, random: Math.floor(Math.random() * length)}))
        this.setState({
            characters
        })
    })
    .catch(error => {
        throw new Error(error)
    })
}

render(){
    const { characters } = this.state
    const { length } = characters
    const widthCharacter = characters && 93 / length
    return <div>
        <Background />
        <ul>
            {length && characters.map(character => {
                const { id, image, random } = character
                return <Character key={`char-${random}-${id}`}
                    src={`https://simpsons-api.herokuapp.com/img/${image}`}
                    posX={id * widthCharacter}
                    zIndex={random}
                    isMain={id === 0}
                />
            })}
        </ul>
    </div>
}
```
##### Router:

`/index.js`

```js
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
...

const RouterApp = () => <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/:name' component={Home} />
</Switch>

ReactDOM.render(
    <Router>
        <RouterApp />
        <GlobalStyle />
    </Router>,
    document.getElementById('root')
)
```

`/pages/Home.js`

```js
const Home = props => {
	const {params: {name}} = props.match
	return <Board characterMain={name}/>
}

```
`/containers/Board.js`

```js
const { characterMain } = this.props
const isMain = character.name.toLowerCase() === characterMain

```

##### HOC - High Order Components:

`/HOC/index.js`

```js
export const withLayout = Component => props => {
    return <Layout>
        <Component {...props} />
    </Layout>
}
```

`/pages/Home.js`

```js
import { compose } from 'recompose'

import { withLayout } from '../HOC'

export default compose(
    withLayout
)(Home)
```
