import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers/history';
import { alertActions } from '../actions/alert';
import Navigation from "./Navigation";
import Routes from "./Routes";
import './App.css'
// import { PrivateRoute } from '../components';
// import { HomePage } from '../HomePage';
// import { LoginPage } from '../LoginPage';
// import { RegisterPage } from '../RegisterPage';
export const TOKEN_STORAGE_ID = "dreamsprawl-token";

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();


    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="App">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                  <Router history={history}>
                  {/* <div className="jumbotron"> */}
                  
                    {/* <div className="container"> */}
                    <Navigation />
                        {/* </div> */}
                    {/* </div> */}
                    <Routes />
                  </Router>
                  </div>
        </div>
    );
}

export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
// import { decode } from "jsonwebtoken";
// import { ClipLoader } from "react-spinners";
// import "./App.scss";
// import useLocalStorage from "./hooks/useLocalStorage";
// import Navigation from "./Navigation";
// import Routes from "./Routes";
// import JoblyApi from "./JoblyApi";
// import UserContext from "./UserContext";

// export const TOKEN_STORAGE_ID = "jobly-token";

// function App() {
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

//   useEffect(() => {
//     async function getCurrentUser() {
//       try {
//         let { username } = decode(token);
//         let currentUser = await JoblyApi.getCurrentUser(username);
//         setCurrentUser(currentUser);
//       } catch (err) {
//         setCurrentUser(null);
//       }
//       setInfoLoaded(true);
//     }
//     setInfoLoaded(false);
//     getCurrentUser();
//   }, [token]);

//   const handleLogOut = () => {
//     setCurrentUser(null);
//     setToken(null);
//   };

//   if (!infoLoaded) {
//     return <ClipLoader size={150} color="#123abc" />;
//   }

//   return (
//     <BrowserRouter>
//       <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//         <div className="App">
//           <Navigation logout={handleLogOut} />
//           <Routes setToken={setToken} />
//         </div>
//       </UserContext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;
