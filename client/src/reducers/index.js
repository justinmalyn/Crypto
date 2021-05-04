import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import coin from './coin';
import setCoin from './setCoin';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  coin,
  setCoin,
  profile
});