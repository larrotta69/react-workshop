/*
    Board Actions
*/
export const BOARD_CHARACTERS_GET = 'BOARD_CHARACTERS_GET'
export const BOARD_MAIN_CHARACTER_UPDATE = 'BOARD_MAIN_CHARACTER_UPDATE'
export const BOARD_CHARACTERS_GET_SUCCESS = 'BOARD_CHARACTERS_GET_SUCCESS'

/*
    Board Actions Creators
*/
export const boardCharactersGet = () => {
    return {type: BOARD_CHARACTERS_GET}
}
export const boardCharactersGetSuccess = payload => {
    return {type: BOARD_CHARACTERS_GET_SUCCESS, characters: payload}
}

export const boardMainCharacterUpdate = payload => {
    return {type: BOARD_MAIN_CHARACTER_UPDATE, characterMain: payload}
}

/*
    Board Reducer
*/
export const reducerBoard = (state = defaultState, action) => {
    switch (action.type) {
        case BOARD_MAIN_CHARACTER_UPDATE: {
            return {...state, characterMain: action.characterMain}
        }
        case BOARD_CHARACTERS_GET_SUCCESS: {
            return {...state, characters: action.characters}
        }
        case BOARD_CHARACTERS_GET: default:
            return state
    }
}
/*
    Board defaultState
*/
const defaultState = {
    characterMain: '',
    characters: []
}
