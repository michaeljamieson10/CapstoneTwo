import users from './users';
import avatar from './avatar';
import {alert} from './alert';
import {registration} from './registration';
import {authentication} from './authentication';
import { combineReducers } from "redux";
/**
 * takes many reducers and puts into one - combine reducer
 */
export default combineReducers({
  users,
  registration,
  authentication,
  alert,
  avatar,
});