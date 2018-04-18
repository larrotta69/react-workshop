import { call, put, takeLatest } from 'redux-saga/effects'

import { BOARD_CHARACTERS_GET, boardCharactersGetSuccess } from './BoardFeatures'

import { getBoardCharactersAPI } from '../../api/CharactersAPI'

/*
    Get All Board Sagas
*/
function* getAllBoardCharacters() {
    const characters = yield call(getBoardCharactersAPI)
    yield put(boardCharactersGetSuccess(characters))
}
export function* boardSagas() {
    yield takeLatest(BOARD_CHARACTERS_GET, getAllBoardCharacters)
}
