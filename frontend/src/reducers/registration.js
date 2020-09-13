import { userConstants } from '../constants/users';
  /** sets registering to true from our registering form, which then toggles on a spinner,
   *  and returns the user upon success
  */
export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}