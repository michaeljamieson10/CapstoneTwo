import React from 'react';
import { avatarDressActions } from '../actions/avatarDress';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import {createStore} from "redux";
import Dress from './Dress';
import rootReducer from "../reducers/root";
//add a supertest it sends request to api
// const request = require("supertest");
const store = createStore(rootReducer);

describe('avatarDressActions', () =>{
    test('returns an action type with type `CORRECT_`',() => {})
test('renders app without crashing', () => {
    //   const { getByText } = render(<Provider store={store}><App /></Provider>);
        render(<Provider store={store}><Dress /></Provider>);
    });
})
