import {createStore} from 'redux';
import rootReducer from './reducers/combineReducers';
import middleware from './middlewares/combineMiddleware';

const store = createStore(rootReducer, middleware);

export default store;
