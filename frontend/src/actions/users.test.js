import { storeFactory } from '../../test/testUtils'
import moxios from 'moxios';
import { userActions } from './users'
describe('get actionCreator', () => {
    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    })
    test('add response to word state', () => {
       const secretWord = 'party';
       const store = storeFactory();
    //    moxios.wait(() =>{
        //    const request = moxios.request.mostRecent();
        //    request.respondWith({
            //    status: 200,
            //    response: secretWord,
        //    });
    //    });
    //    return store.dispatch(userActions() )
      });
})