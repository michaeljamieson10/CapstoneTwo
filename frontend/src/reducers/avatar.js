import {avatarDressConstants} from '../constants/avatarDress';

export default function avatar(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case avatarDressConstants.AVATAR_GETALL_REQUEST:
      return {
        loading: true
      };
    case avatarDressConstants.AVATAR_GETALL_SUCCESS:
      // items: action.avatar
      console.log(action.avatar,' action.avatar from reducer')
      return {
        items: action.avatar
      };
    case avatarDressConstants.AVATAR_CREATE_SUCCESS:
      // items: action.avatar
      console.log(action.avatar,' action.avatar from reducer')
      return {
        items: action.avatar
      };
    case avatarDressConstants.AVATAR_GET_SUCCESS:
      // items: action.avatar
      console.log(action.avatar,' action.avatar from reducer')
      return {
        items: action.avatar
      };
    case avatarDressConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}