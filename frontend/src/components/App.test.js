import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {createStore} from "redux";
import rootReducer from "../reducers/root";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

test('renders app without crashing', () => {
//   const { getByText } = render(<Provider store={store}><App /></Provider>);
    render(<Provider store={store}><App /></Provider>);
//   const linkElement = getByText(/Make a New Meme/i);
//   expect(linkElement).toBeInTheDocument();
});

// import React from "react";
// import { render } from "@testing-library/react";
// import App from "./App";
// import configureStore from 'redux-mock-store';
// const mockStore = configureStore([]);


// it("renders without crashing", function() {
//   render(<App />);
// });