import React, { useContext } from 'react';
// import UserContext from "./UserContext";
import ProfileForm from './ProfileForm';
import dreamSprawlAPI from './dreamSprawlAPI';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { decode } from "jsonwebtoken";
import { useHistory } from "react-router-dom";

import {
    Card,
    CardBody,
    Button
  } from "reactstrap";

function Profile() {
    // const { currentUser, setCurrentUser } = useContext(UserContext);
    const userLoggedIn = useSelector(state => state.authentication);
    const { username } = decode(userLoggedIn.user)
    const history = useHistory();
    async function updateUser(data) {
        let user = await dreamSprawlAPI.updateCurrentUser(username, data);
        // setCurrentUser(user);
    }
    async function deleteUser(data){
        await dreamSprawlAPI.deleteAvatar(username)
        await dreamSprawlAPI.deleteUser(username);
        history.push('/login')
    }
    return (
        <div>
               <Card>
      <CardBody>
            <ProfileForm updateUser={updateUser} />
            
                <CardBody>
                    <p><b>Finished Playing? Delete your account here</b></p>
                    <Button onClick={deleteUser} color="danger">Delete Your Account</Button>
                </CardBody>
            </CardBody>
            </Card>
        </div>
    )
};
export default Profile;