import { avatarDressConstants } from '../constants/avatarDress';
import { alertActions } from './alert';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020";
export const avatarDressActions = {
    changeBodyPart,
    getAvatar,
};
/**
 * This changed body part by patching
 * the body part clicked will be sent to the patch route which then 
 * checks if the data has body part(left-arm, torso) and then adds it appropriately
 * in the cloudinary api it has folder names that match this
 */
function changeBodyPart(username, data) {
    return async function (dispatch) {
        try{
        const _token = localStorage.getItem('user');
        await axios.patch(`${BASE_URL}/api/avatar/${username}`, {_token,data}); 
        dispatch(avatarDressActions.getAvatar(username));
        } catch (err) {
            dispatch(alertActions.error(err.toString()));
        }
    }
}
/**
 * This gets the entire avatar of the person,
 * it gets all the data for each body part,
 * which refers to the cloudinary api, and then pulled from there.
 */
function getAvatar(username) {

    return async function (dispatch) {
        try{
        const _token = localStorage.getItem('user');
        const response = await axios.get(`${BASE_URL}/api/avatar/${username}`,{
            params: {_token}}); 
        console.log(response)
   
        const avatar = response.data.avatar
        dispatch(success(avatar))
        } catch (err) {
            dispatch(alertActions.error(err.toString()));
        }
    }
    function success(avatar) { return { type: avatarDressConstants.AVATAR_GET_SUCCESS, avatar } }
}
