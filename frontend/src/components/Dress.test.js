// import React from "react";

// import { configure, shallow, mount } from "enzyme";
// import Adaptor from "enzyme-adapter-react-16";
// // import NavigationItems from "./NgnItems";
// import { Provider } from "react-redux";
// import {createStore} from "redux";
// import rootReducer from "../reducers/root";
// const store = createStore(rootReducer);
// import Dress from './Dress';

// configure({ adapter: new Adaptor() });

// describe("<Dress />", () => {
//   let wrapper;

//   beforeEach(() => {
//     // wrapper = shallow(<Dress />);
//     // wrapper = shallow(<Provider store={store}><Dress /></Provider>);
//   });

//   it("should render two <NgnItem /> elements if not authenticated", () => {
//     // expect(wrapper.find(NavigationItem)).toHaveLength(2);
//   });
// //   it("Check if text exist in homepage", () => {
//     // expect(wrapper.text().includes('Welcome to DreamSprawl!')).toBe(true);
// //   });

// //   it("should render three <NgnItem /> elements if authenticated", () => {
//     // wrapper = shallow(<NavigationItems isAuthenticated />);
//     // wrapper.setProps({ isAuthenticated: true });
//     // expect(wrapper.find(NavigationItem)).toHaveLength(3);
// //   });
// //   it("should render logout if authenticated", () => {
//     // wrapper.setProps({ isAuthenticated: true });
//     // wrapper = shallow(<NavigationItems isAuthenticated />);
//     // wrapper.setProps({ isAuthenticated: true });
//     // expect(
//       // wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
//     // ).toEqual(true);
// //   });
// });

import React from 'react';
import { avatarDressActions } from '../actions/avatarDress';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import {createStore} from "redux";
import Dress from './Dress';
import rootReducer from "../reducers/root";
import { userActions } from '../actions/users';
//add a supertest it sends request to api
// const request = require("supertest");
const store = createStore(rootReducer);

describe('avatarDressActions', () =>{
    beforeEach(() => {
        // store.dispatch(userActions.register(user));
      });
      
    test('returns an action type with type `CORRECT_`',() => {})
test('renders app without crashing', () => {
    //   const { getByText } = render(<Provider store={store}><App /></Provider>);
        render(<Provider store={store}><Dress /></Provider>);
    });
})