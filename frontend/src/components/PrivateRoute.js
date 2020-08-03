import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/users';
// import UserContext from "./UserContext";

function PrivateRoute({ exact, path, children }) {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
