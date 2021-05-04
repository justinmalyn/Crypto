import { SETCOIN } from '../actions/types'

const initialState = {
    
}

export default function(state = initialState, action){
    const {type, payload } = action;
    //console.log(state)
    switch(type){
        case SETCOIN:
            return {
                ...state,
                setCoin:payload
            }
        default:
            return{
                ...state
            }
    }
}