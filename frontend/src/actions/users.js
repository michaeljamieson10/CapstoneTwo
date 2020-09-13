import { userConstants } from '../constants/users';
import { alertActions } from './alert';
import { history } from '../helpers/history';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020";

export const userActions = {
    login,
    logout,
    register,
    getAll,
};

/**
 * function to login
 * logs user in, sets user to token in local storage
 * changes url to homepage
 * alert success sends a green popup to say welcome back
 */
function login(username, password) {
    return async function (dispatch) {
        dispatch(request({username}));
        try{
            console.log(BASE_URL)
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {username, password}); 
        localStorage.setItem('user', response.data.token);
        dispatch(success(response.data.token));
        history.push('/')
        dispatch(alertActions.success('Welcome back'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
        }
    }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
/**
 * logout removes the user token from local storage,
 * now the user cannot access private routes
 */
function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}
/**
 * registers user, adds them do the database by post method
 * also creates a avatar that is connected to the username
 */
function register(user) {
    return async function (dispatch) {

        dispatch(request(user));
        try{
            const response = await axios.post(`${BASE_URL}/api/users`, user);
            const response2 = await axios.post(`${BASE_URL}/api/avatar/${user.username}` );
            dispatch(success());
            history.push('/')
            console.log(user,'this is user from user register action')
            dispatch(alertActions.success('Registration successful'));
        } catch (err) {
            dispatch(failure(err.toString()));
            dispatch(alertActions.error(err.toString()));
          }
      };
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
/**
 * getAll gets all of  of the users from the data base
 */

function getAll() {
    return async function (dispatch) {
        try{
            const _token = localStorage.getItem('user');
            const response = await axios.get(`${BASE_URL}/api/users`, {
                params: {_token}}); 
            const users = response.data.users;

        dispatch(success(users));
        } catch (err) {
            dispatch(alertActions.error(err.toString()));
        }
    }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
}
