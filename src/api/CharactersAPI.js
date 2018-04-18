import axios from 'axios'

const serverUrl = 'https://simpsons-api.herokuapp.com/characters'

/*
    Get All Characters API
*/
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
