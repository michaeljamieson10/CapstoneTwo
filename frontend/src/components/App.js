import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers/history';
import { alertActions } from '../actions/alert';
import Navigation from "./Navigation";
import Routes from "./Routes";
import './App.css'

export const TOKEN_STORAGE_ID = "dreamsprawl-token";
/**
 * App has navigation and routes, 
 * where the alert message is displayed from the action methods
 * if failed/success
 */
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
                    {/*
                        Where alert message is displayed 
                     */}
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                  <Router history={history}>
                    <Navigation />
                    <Routes />
                  </Router>
                  </div>
        </div>
    );
}

export default App;

