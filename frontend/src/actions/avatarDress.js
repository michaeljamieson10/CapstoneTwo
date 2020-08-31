import { avatarDressConstants } from '../constants/avatarDress';
// import { userService } from '../services/users';
import { alertActions } from './alert';
// import { useHistory } from 'react-router-dom';
import { history } from '../helpers/history';
// const history = useHistory();
import axios from "axios";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020/api";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020";
export const avatarDressActions = {
    testDress,
    changeBodyPart,
    getAvatar,
};
// route not in use because we are directling calling it with dreamsprawl api
function testDress(username) {
    return async function (dispatch) {
        dispatch(request({username}));
        try{
        const response = await axios.get(`${BASE_URL}/api/avatar/dress`, {username}); 
        const cloudName = 'dreamsprawl';
        console.log(response.data.result.resources);
        dispatch(success(response.data.result.resources))
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    function request(avatar) { return { type: avatarDressConstants.AVATAR_GETALL_REQUEST, avatar } }
    function success(avatar) { return { type: avatarDressConstants.AVATAR_GETALL_SUCCESS, avatar } }
    function failure(error) { return { type: avatarDressConstants.AVATAR_DRESS_FAILURE, error } }
}
function changeBodyPart(username, data) {
    return async function (dispatch) {
        // dispatch(request({username}));
        try{
            console.log(username,data,'inside changebodypart')
        const _token = localStorage.getItem('user');
        console.log(_token,'this is token in patchroute')
        const response = await axios.patch(`${BASE_URL}/api/avatar/${username}`, {_token,data}); 
        console.log(response)
        dispatch(avatarDressActions.getAvatar(username));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    function request(avatar) { return { type: avatarDressConstants.AVATAR_GETALL_REQUEST, avatar } }
    function success(avatar) { return { type: avatarDressConstants.AVATAR_GETALL_SUCCESS, avatar } }
    function failure(error) { return { type: avatarDressConstants.AVATAR_DRESS_FAILURE, error } }
}
function getAvatar(username) {

    return async function (dispatch) {
        dispatch(request(username));
        try{
        const _token = localStorage.getItem('user');
        const response = await axios.get(`${BASE_URL}/api/avatar/${username}`,{
            params: {_token}}); 
        console.log(response)
   
        const avatar = response.data.avatar
        dispatch(success(avatar))
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    function request(avatar) { return { type: avatarDressConstants.AVATAR_GET_REQUEST, avatar } }
    function success(avatar) { return { type: avatarDressConstants.AVATAR_GET_SUCCESS, avatar } }
    function failure(error) { return { type: avatarDressConstants.AVATAR_DRESS_FAILURE, error } }
}
