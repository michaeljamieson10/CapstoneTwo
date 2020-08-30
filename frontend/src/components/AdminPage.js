import React, { useEffect } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import dreamSprawlAPI from './dreamSprawlAPI';
import { decode } from "jsonwebtoken";
import './ActualAvatar.css';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    Button
} from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { userActions } from '../actions/users';

function AdminPage() {
    const history = useHistory();
    const userLoggedIn = useSelector(state => state.authentication);
    const { username } = decode(userLoggedIn.user)
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getAll())
    }, []);
    async function becomeAdmin(){
        await dreamSprawlAPI.becomeAdmin(username);
        history.push('/login')
    }
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
