import { generateMedia } from 'styled-media-query'

import { sizes } from './variables'

export const box = () => `
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.09);
`

const mediaQuery = generateMedia(sizes)
export const media = {
    mobile: mediaQuery.lessThan('mobile'),
    medium: mediaQuery.greaterThan('mobile'),
    large: mediaQuery.greaterThan('tablet'),
    wide: mediaQuery.greaterThan('desktop'),
}
