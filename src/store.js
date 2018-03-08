import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducerBoard } from './containers/Board/BoardFeatures'

import { boardSagas } from './containers/Board/BoardSagas'

const sagaMiddleware = createSagaMiddleware()
// const reducers = combineReducers({
//     reducerBoard
// })

const configureStore = createStore(
    reducerBoard,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)
sagaMiddleware.run(boardSagas)

export default configureStore
