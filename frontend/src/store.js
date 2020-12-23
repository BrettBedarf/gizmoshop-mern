import { createStore, combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer } from './reducers/productReducer.js';

const reducer = combineReducers({ productList: productReducer });
const initialState = {}; //initial state when store loads
const middleware = [Thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;