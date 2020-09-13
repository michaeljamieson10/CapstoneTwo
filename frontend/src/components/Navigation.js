import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css'

/** 
 * if logged in shows logged in nav 
 * if logged out shows logged register/login
*/
function Navigation() {
  const userLoggedIn = useSelector(state => state.authentication.loggedIn);

  function loggedInNav() {
    return (
      
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/admin">
            Admin
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/dress">
            Dress Character
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/users/all">
            Users
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Log out
          </Link>
        </li>
      </ul>
      
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <Navbar className='Navigation' bg="light">
    {/* <nav className="Navigation navbar navbar-expand-md"> */}
      <Link className="navbar-brand" to="/">
        Dreamsprawl
      </Link>
      {/* {loggedInNav()} */}
      {userLoggedIn ? loggedInNav() : loggedOutNav()}
      </Navbar>
    // </nav>
  );
}

// export default loggedInNav;
export default Navigation;
