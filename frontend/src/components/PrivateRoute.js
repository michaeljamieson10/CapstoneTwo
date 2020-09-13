import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * private route makes the route private
 * it checks if user exist in the local storage which is a token
 */
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
