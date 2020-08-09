import { avatarDressConstants } from '../constants/avatarDress';
// import { userService } from '../services/users';
import { alertActions } from './alert';
// import { useHistory } from 'react-router-dom';
import { history } from '../helpers/history';
// const history = useHistory();
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3020/api";

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
        const response = await axios.get(`${API_URL}/avatar/dress`, {username}); 
        const cloudName = 'dreamsprawl';
        console.log(response.data.result.resources);
        dispatch(success(response.data.result.resources))
        // dispatch(success(response));
        // dispatch(alertActions.success('Welcome back'));
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
        // data['_token'] = _token;
        const response = await axios.patch(`${API_URL}/avatar/${username}`, {_token,data}); 
        console.log(response)
        dispatch(avatarDressActions.getAvatar(username));
        // dispatch(success(response.data.result.resources))
        // dispatch(success(response));
        // dispatch(alertActions.success('Welcome back'));
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
        const response = await axios.get(`${API_URL}/avatar/${username}`); 
        console.log(response)
        // const cloudName = 'dreamsprawl';
        // const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/avatar`;
        // let formData = new FormData();
        // const response = await axios.get(`https://api.cloudinary.com/v1_1/dreamsprawl/resources/avatar`); 
        // const response = await axios.get(url, formData); 
        const avatar = response.data.avatar
        dispatch(success(avatar))
        // console.log(response.data.result.resources);
        // dispatch(success(response.data.result.resources))
        // dispatch(success(response));
        // dispatch(alertActions.success('Welcome back'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    function request(avatar) { return { type: avatarDressConstants.AVATAR_GET_REQUEST, avatar } }
    function success(avatar) { return { type: avatarDressConstants.AVATAR_GET_SUCCESS, avatar } }
    function failure(error) { return { type: avatarDressConstants.AVATAR_DRESS_FAILURE, error } }
}

// function logout() {
//     // userService.logout();
//     localStorage.removeItem('user');
//     return { type: userConstants.LOGOUT };
// }

// function register(user) {
//     return async function (dispatch) {
//         // dispatch(success());

//         dispatch(request(user));
//         try{
//             const response = await axios.post(`${API_URL}/users`, user);
//             dispatch(success());
//             history.push('/')
//             dispatch(alertActions.success('Registration successful'));
//         } catch (err) {
//             dispatch(failure(err.toString()));
//             dispatch(alertActions.error(err.toString()));
//           }

//       };


//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

// function getAll() {

//     return async function (dispatch) {
//         dispatch(request());
//         try{
//             const _token = localStorage.getItem('user');
//             console.log({_token},'token')
//             const response = await axios.get(`${API_URL}/users`, {
//                 params: {_token}}); 
//             console.log(response.data.users)
//             const users = response.data.users;
//         dispatch(success(users));
//         } catch (err) {
//             dispatch(failure(err.toString()));
//             dispatch(alertActions.error(err.toString()));
//         }
//     }

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }
// // export default userActions;