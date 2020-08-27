// import React from 'react';

// import Enzyme,{ shallow } from 'enzyme';
// // import EnzymeAdapter from 'enzyme-adapter-react-16';
// import Adapter from 'enzyme-adapter-react-16';
// import App from './App';
import { render } from '@testing-library/react';
// import {createStore} from "redux";
// import rootReducer from "../reducers/root";
// import { Provider } from "react-redux";
// const store = createStore(rootReducer);

// Enzyme.configure({ adapter: new Adapter() });
// // Enzyme.configure({ adapter: new EnzymeAdapter() });


    // test('renders app without crashing', () => {
        // //   const { getByText } = render(<Provider store={store}><App /></Provider>);
        //     // render(<Provider store={store}><App /></Provider>);
        //     // const wrapper = shallow(<App /> );
        //     // const wrapper = shallow(<Provider store={store}><App /></Provider>);
        //     // console.log(wrapper.debug());
        // });

import React from 'react';
import {Provider} from 'react-redux'
import Enzyme,{ mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import {createStore} from "redux";
import rootReducer from "../reducers/root";
// import { alertActions } from '../actions/alert';

const store = createStore(rootReducer);
// Enzyme.configure({ adapter: new Adapter() });
// const mockStore = configureMockStore([thunk]);
test('renders app without crashing', () => {
    //   const { getByText } = render(<Provider store={store}><App /></Provider>);
        render(<Provider store={store}><App /></Provider>);
    });
// const setup = (secretWord="party") => {
//     mockGetSecretWord.mockClear();
//     alertActions.getSecretWord = mockGetSecretWord;
  
//     const mockUseReducer = jest.fn()
//       .mockReturnValue([
//         { secretWord, language: 'en' },
//         jest.fn()
//       ]);
  
//     React.useReducer = mockUseReducer;
  
//     // use mount, because useEffect not called on `shallow`
//     // https://github.com/airbnb/enzyme/issues/2086
//     return mount(<App />);
//   }

describe('App', () => {
  it('should render a startup component if startup is not complete', () => {
    // const wrapper = mount(<App /> );
    // const wrapper = mount(<Provider store={store}><App /></Provider>);
    
    // const store = mockStore({
    //   startup: { complete: false }
    // });
    // const wrapper = mount(
    //   <Provider store={store}>
        {/* <App /> */}
      {/* </Provider> */}
    // )
    // expect(wrapper.find('Startup').length).toEqual(1)
  })
})