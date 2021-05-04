import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 100000) => dispatch => {
  const id = uuid.v4();
  ///dispatch({ type: REMOVE_ALERT, payload: id })
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};

export const removeAlerts = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({ type: REMOVE_ALERT, payload: id })
}
