import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import root from './reducers/root';

export const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(root);
