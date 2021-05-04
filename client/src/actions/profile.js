import axios from 'axios';
import { GET_PROFILE, POST_TRADE, PROFILE_VALUE } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch{
        console.log('didnt work')
    }
}

export const postTrade = tradeInfo => async dispatch => {
    try {
        await axios.post('/api/profile', tradeInfo);
        dispatch({
            type:POST_TRADE,
            payload: tradeInfo
        })
    } catch {
        console.log('didnt work')
    }
}

export const updateProfileValue = (profileValue) => dispatch => {
    try {
        dispatch({
            type:PROFILE_VALUE,
            payload: profileValue
        })
    } catch {
        console.log('didnt work')
    }
}
