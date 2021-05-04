import { COIN } from '../actions/types'

const initialState = [{
    allCoins:null
}]

export default function(state = initialState, action){
    const {type, payload } = action;
    switch(type){
        case COIN:
            return {
                ...state,
                allCoins:payload
            }
        default:
            return{
                ...state
            }
    }
    
}