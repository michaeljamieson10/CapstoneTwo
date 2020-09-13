import { userConstants } from '../constants/users';

/**
 * reducers only accept pure arrays no mutations
 */
let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  /** sets logging in to true from our logging in form, which then toggles on a spinner,
   *  and returns the user upon success
  */
  switch (action.type) {  
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}