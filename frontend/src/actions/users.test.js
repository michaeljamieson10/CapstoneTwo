import { storeFactory } from '../../test/testUtils'
import axios from "axios";
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert'
import { userActions } from './users';
const store = createStore(rootReducer);
describe('get actionCreator', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://localhost:3020/api/users', {
            status: 200,
            response: 'heeqwi'
      })
        moxios.stubRequest('http://localhost:3020/api/avatar/username', {
            status: 200,
            response: 'heeqwi'
      })
    });
    afterEach(() => {
        moxios.uninstall()
    })
    test('add response to word state', (done) => {
        // jest.setTimeout(30000);

       const secretWord = 'party';
       const user = {
           'username':'test',
           'password':'password',
           'first_name':'mike',
           'last_name':'jamieson'
    }
       const store = storeFactory();
    //    moxios.stubRequest('/say/hello', {
    //     status: 200,
    //     responseText: user
    //   })
    //   let onFulfilled = sinon.spy();
    //   axios.get('/say/hello').then(onFulfilled);
    //   moxios.wait(function (done) {
    //     equal(onFulfilled.getCall(0).args[0].data, user)
    //     done()
    //   })

    //    moxios.wait(() =>{
    //        const request = moxios.request.mostRecent();
    //        request.respondWith({
    //            status: 200,
    //            response: user
    //        });
    //        console.log(request,'this is request')
    //     });
    moxios.wait(() => {
        return store.dispatch(userActions.register(user))
        .then(() => {
            const newState = store.getState();
            console.log(newState,'inside newstate')
            console.log(user,'inside newstate')
            expect(newState.user).toBe(user);
            done()
          })
    })
        
        // return store.dispatch(userActions() )
        // .then(() => {
        //     const newState = store.getState();
        //     expect(newState.secretWord).toBe(secretWord);
        //   })
      });
})