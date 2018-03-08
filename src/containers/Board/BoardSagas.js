import { call, put, takeLatest } from 'redux-saga/effects'

import { BOARD_CHARACTERS_GET, BOARD_CHARACTERS_GET_SUCCESS } from './BoardFeatures'

import { getBoardCharactersAPI } from '../../api/CharactersAPI'

/*
    Get All Board Sagas
*/
function* getAllBoardCharacters() {
    const characters = yield call(getBoardCharactersAPI)
    yield put({type: BOARD_CHARACTERS_GET_SUCCESS, characters})
}
export function* boardSagas() {
    yield takeLatest(BOARD_CHARACTERS_GET, getAllBoardCharacters)
}
