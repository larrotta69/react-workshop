# React-workshop

## Run the project

* Clone the repo `https://github.com/larrotta69/react-workshop/tree/third-session-start`

* Go to `react-workshop` folder
* Run `npm install`
* Then `npm start`
* Go to [localhost](http://localhost:3000/)

## First round

* Create the client scripts to build production bundle
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

