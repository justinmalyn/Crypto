import { SETCOIN } from "./types";

export const setCoin = (selected) => async dispatch => {
    try{
        dispatch({
            type:SETCOIN,
            payload:selected
        })
    }
    catch{
        console.log("hey you failed")
    }
}