import React from "react";
import { Switch, Route } from "react-router-dom";
import Dress from "./Dress";
import PrivateRoute from './PrivateRoute';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserAllPage from "./UserAllPage";
// import UserPage from "./UserPage";
import ProfilePage from "./ProfilePage"
import AdminPage from "./AdminPage";
/** these are routes  which when the url goes to the route it will render that componenet inside the route */
function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <PrivateRoute exact path="/dress">
        <Dress />
      </PrivateRoute>
      <PrivateRoute exact path="/users/all">
        <UserAllPage />
      </PrivateRoute>
      <PrivateRoute exact path="/admin">
        <AdminPage />
      </PrivateRoute>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/login">
        <LoginPage/>
      </Route>
      <PrivateRoute exact path="/profile">
        <ProfilePage/>
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
