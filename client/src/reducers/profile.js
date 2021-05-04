import { GET_PROFILE, POST_TRADE, PROFILE_VALUE } from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    profileValue:null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile:payload,
                loading: false
            }
        case POST_TRADE:
            return{
                ...state
            }
        case PROFILE_VALUE:
        return{
            ...state,
            profileValue:payload
        }
        default: 
        return{
            ...state
        }
    }
}


