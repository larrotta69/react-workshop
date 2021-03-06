# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/second-session-start`

* Go to `react-workshop` folder
* Run `npm install`
* Then `npm start`
* Go to [localhost](http://localhost:3000/)

## First round

* Create Store
* Configure Provider
* Create a basic Reducer
* Our first Action and Action Creator

#### Let's code

##### Store:

`/store.js`

```js
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducerBoard } from './containers/Board/BoardFeatures'

const configureStore = createStore(
    reducerBoard,
    composeWithDevTools()
)

export default configureStore

```
##### Provider:
`/index.js`

```js
import {Provider} from 'react-redux'
import configureStore from './store'
...

const store = configureStore

const Root = ({store}) => (
    <Provider store={store}>
        <Home />
    </Provider>
)
ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
)
```

##### Reducer:
`/containers/Board/BoardFeatures.js`

```js
export const reducerBoard = (state, action) => {
    switch (action.type) {
        case BOARD_CHARACTERS_GET: default:
            return state
    }
}

```

##### Action & Action Creator:
`/containers/Board/BoardFeatures.js`

```js
export const BOARD_CHARACTERS_GET = 'BOARD_CHARACTERS_GET'

export const boardCharactersGet = () => {
    return {type: BOARD_CHARACTERS_GET}
}

```

## Second round

* Create a default State to Reducer
* Connect Board to Redux
* Dispatch Action from Board props

#### Let's code

##### Default State:

`/containers/Board/BoardFeatures.js`

```js
export const reducerBoard = (state = defaultState, action) => {
    switch (action.type) {
        case BOARD_CHARACTERS_GET: default:
            return state
    }
}

const defaultState = {
    characterMain: '',
    characters: []
}
```
> Let's check Redux DevTools

##### Board to Redux:

`/containers/Board/Board.js`

```js
componentDidMount() {
    this.props.boardCharactersGet()
}
...
const mapStateToProps = state => {
    return {
        characters: state.characters,
        characterMain: state.characterMain
    }
}


const mapDispatchToProps = dispatch => {
    return {
        boardCharactersGet() {
            dispatch(boardCharactersGet())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
```


## Third round

* Make the API call - Random in a smart way
* Configure Store to support Sagas
* Redux Sagas - Listen a Redux Action

#### Let's code

##### Make API call:

`/api/CharactersAPI.js`

```js
import axios from 'axios'

const serverUrl = 'https://simpsons-api.herokuapp.com/characters'

export const getBoardCharactersAPI = () => {
    return axios.get(serverUrl)
		.then(response => {
            const { length } = response.data
            const characterWithRandom = response.data.map((character) => {
                return {...character, random: Math.floor(Math.random() * length)}
            })
            return characterWithRandom
        })
        .catch(error => {
            throw new Error(error)
        })
}
```
##### Support Sagas (Middleware):

`/store.js`

```js
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
...

const RouterApp = () => (
    <Switch>
        <Route exact path='/:name?' component={Home} />
    </Switch>
)

ReactDOM.render(
    <Router>
        <RouterApp />
    </Router>,
    document.getElementById('root')
)
sagaMiddleware.run(boardSagas)
```

##### Redux Sagas:

`/containers/Board/BoardSagas.js`

```js
import { call, put, takeLatest } from 'redux-saga/effects'

import { BOARD_CHARACTERS_GET, boardCharactersGetSuccess } from './BoardFeatures'

import { getBoardCharactersAPI } from '../../api/CharactersAPI'

function* getAllBoardCharacters() {
   	const characters = yield call(getBoardCharactersAPI)
	yield put(boardCharactersGetSuccess(characters))
}
export function* boardSagas() {
    yield takeLatest(BOARD_CHARACTERS_GET, getAllBoardCharacters)
}

```

##### Success Action:

`/containers/Board/BoardFeatures.js`

```js
export const BOARD_CHARACTERS_GET_SUCCESS = 'BOARD_CHARACTERS_GET_SUCCESS'
...
export const boardCharactersGetSuccess = payload => {
    return {type: BOARD_CHARACTERS_GET_SUCCESS, characters: payload}
}
...
switch (action.type) {
    case BOARD_CHARACTERS_GET_SUCCESS: {
        return {...state, characters: action.characters}
    }
    case BOARD_CHARACTERS_GET: default:
        return state
}

```
`/containers/Board/Board.js`

```js
zIndex={character.random}
```

#### Let's improve our code

##### Shorthands:

`/containers/Board/Board.js`

```js
export default connect(
    ({characters}) => ({characters}),
    {boardCharactersGet}
)(Board)
```
