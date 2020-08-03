import { userConstants } from '../constants/users';
// import { userService } from '../services/users';
import { alertActions } from './alert';
// import { useHistory } from 'react-router-dom';
import { history } from '../helpers/history';
// const history = useHistory();
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3020/api";



export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    // checkCurrentUser,
};

function login(username, password) {
    return async function (dispatch) {
        dispatch(request({username}));
        try{
        const response = await axios.post(`${API_URL}/auth/login`, {username, password}); 
        localStorage.setItem('user', response.data.token);
        dispatch(success(response.data.token));
        history.push('/')
        dispatch(alertActions.success('Welcome back'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    // return dispatch => {
        // dispatch(request({ username }));

        // userService.login(username, password)
        //     .then(
        //         user => { 
        //             dispatch(success(user));
        //             // history.push('/');
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    // };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // userService.logout();
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return async function (dispatch) {
        // dispatch(success());

        dispatch(request(user));
        try{
            const response = await axios.post(`${API_URL}/users`, user);
            dispatch(success());
            history.push('/')
            dispatch(alertActions.success('Registration successful'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
          }
        
        // return dispatch(request(response.data));
        // console.log(response)
        // dispatch(request(response.data));
        // dispatch(alertActions.success('Registration successful'));
      };
    
    // function addPost(post) {
    //   return {
    //     type: ADD_POST,
    //     post
    //   };
    
    // return dispatch => {
        // dispatch(request(user));
        
        // this is a fetch i will use axios
        // userService.register(user)
            // .then(
            //     user => { 
            //         dispatch(success());
            //         history.push('/login');
            //         dispatch(alertActions.success('Registration successful'));
            //     },
            //     error => {
            //         dispatch(failure(error.toString()));
            //         dispatch(alertActions.error(error.toString()));
            //     }
            // );
    // };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
// function checkCurrentUser() {
//     return async function (dispatch) {
//         try{
//             const user = localStorage.getItem('user')
//             const response = await axios.post(`${API_URL}/users`, user);
//             history.push('/')
//         } catch (err) {
//             history.push('/login')
//           }
//       };
// }

function getAll() {
    // const authAxios = axios.create({
    //     baseURL: API_URL,
    //     headers: {
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`
    //     }
    // })
    
    return async function (dispatch) {
        dispatch(request());
        try{
            const _token = localStorage.getItem('user');
            console.log({_token},'token')
            const response = await axios.get(`${API_URL}/users`, {
                params: {_token}}); 
            console.log(response.data.users)
            // const response2 = await axios.get()
            const users = response.data.users;
            // const response = await authAxios.get(`/users`);
        dispatch(success(users));
        // dispatch(success(response.data.token));
        // dispatch(alertActions.success('Welcome back'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    // return dispatch => {
        // dispatch(request());

    //     userService.getAll()
    //         .then(
    //             users => dispatch(success(users)),
    //             error => dispatch(failure(error.toString()))
    //         );
    // };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        // userService.delete(id)
        //     .then(
        //         user => dispatch(success(id)),
        //         error => dispatch(failure(id, error.toString()))
        //     );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
// export default userActions;