import { render } from '@testing-library/react';

import React from 'react';
import {Provider} from 'react-redux'
import App from './App';
import {createStore} from "redux";
import rootReducer from "../reducers/root";

const store = createStore(rootReducer);
test('renders app without crashing', () => {
        render(<Provider store={store}><App /></Provider>);
    });

