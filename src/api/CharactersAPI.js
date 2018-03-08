import axios from 'axios'

const serverUrl = 'https://simpsons-api.herokuapp.com/characters'

/*
    Get All Characters API
*/
export const getBoardCharactersAPI = () => {
    return axios.get(serverUrl)
        .then(response => response.data)
        .catch(error => {
            throw new Error(error)
        })
}
