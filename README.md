# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/second-session-start`

* Go to `react-workshop` folder
* Run `npm install`
* Then `npm start`
* Go to [localhost](http://localhost:3000/)

## First round

* Create React App
* JSX
* Composition
* Props

#### Let's code

##### JSX - Composition:

`/pages/Home.js`

```js
const Home = () => {
    return (
        <Board characterMain="Homer Simpson"/>
    )
}
```

##### Props:

`/containers/Board.js`

```js
const Board = (props) => {
    const { characterMain } = props
    return (
        <div>
            <h1>{characterMain}</h1>
        </div>
    )
}

Board.propTypes = {
    characterMain: PropTypes.string
}
```

> Try a different data type as props: `<Board characterMain={['Homer', 'Simpson']}/>`

#### Adding Background component
```js
<Background/>
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

```js
class Board extends React.Component {
    state = {
        characters: ['Marge', 'Bart', 'Lisa']
    }
    render(){
        const { characterMain } = this.props
        const { characters } = this.state
        return (
            <div>
                <Background />
                <h1>{characterMain}</h1>
                {characters.map(character => <div key={`char-${character}`}>{character}</div>)}
            </div>
        )
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
setNewCharacters = (data) => () => {
        this.setState({
            characters: data
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

```js
const Character = (props) => {
    const { src, name, posX, zIndex, isMain } = props
    return (
        <StyledCharacter posX={posX} zIndex={zIndex} isMain={isMain}>
            <img src={src} alt={name}/>
        </StyledCharacter>
    )
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
componentDidMount() {
        axios.get('https://simpsons-api.herokuapp.com/characters')
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
        .catch(error => {
            throw new Error(error)
        })
    }

    render(){
        const { characters } = this.state
        const widthCharacter = characters && 93 / characters.length
        return (
            <div>
                <Background />
                <ul>
                    {characters && characters.map(character => {
                        const zIndex = characters && Math.floor(Math.random() * characters.length)
                        const isMain = character.id === 1
                        return <Character key={`char-${character.id}`}
                            src={`https://simpsons-api.herokuapp.com/img/${character.image}`}
                            posX={character.id * widthCharacter}
                            zIndex={zIndex}
                            isMain={isMain}
                        />
                    })}
                </ul>
            </div>
        )

    }
```
##### Router:

`/index.js`

```js
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
...

const RouterApp = () => (
    <Switch>
        <Route exact path='/:name' component={Home} />
    </Switch>
)

ReactDOM.render(
    <Router>
        <RouterApp />
    </Router>,
    document.getElementById('root')
)
```

`/pages/Home.js`

```js
const {params: {name}} = props.match
<Board characterMain={name}/>

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
