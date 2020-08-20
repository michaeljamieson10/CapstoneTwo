import React, {useEffect, useState} from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from "react-router-dom";
import { userActions } from '../actions/users';
import dreamSprawlAPI from './dreamSprawlAPI';

const UserPage = (props) => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch()
    const { username } = useParams();
    console.log(username, 'prior to api call')
    useEffect(() => {
      async function getUser() {
        const user  = await dreamSprawlAPI.getUser(username);
        console.log(user)
      }
      getUser()
      // setInfoLoaded(true)
    }, []);
  return (
    <div>This is the userpageHello</div>
    // <Table>
    //   <thead>
    //   {users.loading && <em>Loading users...</em>}
    //     <tr>
    //       <th>#</th>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //     </tr>
    //   </thead>
    //   {users.items && <tbody>{users.items.map((user, index) => 
    //                     <tr>
    //                         <th scope="row">{index}</th>
    //                         <td>{user.first_name}</td>
    //                         <td>{user.last_name}</td>
    //                         <td>{user.username}</td>
    //                     </tr>)}
    //                     </tbody>}
    // </Table>
  );
}

export default UserPage;