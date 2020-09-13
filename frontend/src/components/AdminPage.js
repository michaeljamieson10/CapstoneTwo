import React, { useEffect } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import dreamSprawlAPI from './dreamSprawlAPI';
import { decode } from "jsonwebtoken";
import './ActualAvatar.css';
import { useHistory } from 'react-router-dom';
import {
    Button
} from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { userActions } from '../actions/users';
/**
 * admin page, where user can become an admin by clicking on the admin button
 */
function AdminPage() {
    const history = useHistory();
    const userLoggedIn = useSelector(state => state.authentication);
    /**
     * userLoggedin.user is the token to allow user to view page
     */
    const { username } = decode(userLoggedIn.user)
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    /**
     * renders on page load out
     * in this case we use it to get all users using redux's dispatch 
     * to fetch data from our database
     * use effect also stops unnecessary rerendering
     * runs after everysingle render
     * empty array only allows render after first render
     */
    useEffect(() => {
        dispatch(userActions.getAll())
    }, []);
    /**
     * an api call to change user to admin
     */
    async function becomeAdmin(){
        await dreamSprawlAPI.becomeAdmin(username);
        history.push('/login');
        window.location.reload();
    }
    /**
     * an api call to delete user by a user that became an admin
    */
    async function adminDeleteUser(data){
        console.log(data)
        await dreamSprawlAPI.adminDeleteUser(data);
        dispatch(userActions.getAll())
    }
    return (
        <div>
            Delete User:
            <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    Dropdown Click On User to Delete
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {users.items && users.items.map((user)=> (<Dropdown.Item onClick={() =>adminDeleteUser(user.username)}>{user.username}</Dropdown.Item>))}
                </Dropdown.Menu>
            </Dropdown>
            <Button onClick={becomeAdmin} color="success">Become admin</Button>
        </div>
        
);
}

export default AdminPage;
