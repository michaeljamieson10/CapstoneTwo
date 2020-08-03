import React, {useEffect, useState} from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/users';
const UserAllPage = (props) => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.getAll())
    }, []);
  return (

    <Table>
      <thead>
      {users.loading && <em>Loading users...</em>}
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      {users.items && <tbody>{users.items.map((user, index) => 
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                        </tr>)}
                        </tbody>}
    </Table>
  );
}

export default UserAllPage;